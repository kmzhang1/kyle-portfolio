/**
 * Chat API route for portfolio AI agent
 * Uses Google Gemini with RAG for answering questions about experience and projects
 */

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getRAGInstance } from "@/lib/rag";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// Contact and navigation information
const CONTACT_INFO = {
  email: "kylemzhang@gmail.com",
  github: "https://github.com/kmzhang1",
  linkedin: "https://www.linkedin.com/in/kyle-zhang-6ab855220/",
  cv: "/Kyle_Resume.pdf",
};

// Define tools for function calling
const tools = [
  {
    name: "get_contact_email",
    description:
      "Get Kyle's professional contact email address. Use when the user asks for contact information, how to reach Kyle, or his email.",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_social_link",
    description:
      "Get a link to Kyle's social profiles or CV. Use when the user asks for GitHub, LinkedIn, resume, or CV.",
    parameters: {
      type: "object",
      properties: {
        platform: {
          type: "string",
          enum: ["github", "linkedin", "cv"],
          description: "The platform or resource to link to",
        },
      },
      required: ["platform"],
    },
  },
  {
    name: "answer_with_resume_link",
    description:
      "Use this when answering questions about Kyle's experience, education, or skills. This tool provides a direct link to the specific resume tab while you answer the question. ALWAYS use this for questions about: work experience, education background, technical skills, or qualifications.",
    parameters: {
      type: "object",
      properties: {
        tab: {
          type: "string",
          enum: ["experience", "education", "skills", "about"],
          description: "The resume tab that relates to the question being asked",
        },
      },
      required: ["tab"],
    },
  },
  {
    name: "navigate_to_page",
    description:
      "Navigate to a specific page on the portfolio website. Use this for projects page or contact page navigation requests.",
    parameters: {
      type: "object",
      properties: {
        page: {
          type: "string",
          enum: ["home", "projects", "contact"],
          description: "The page to navigate to",
        },
      },
      required: ["page"],
    },
  },
];

// System prompt for the AI agent
const SYSTEM_PROMPT = `You are a helpful assistant for Kyle Zhang's portfolio website.
Your role is to answer questions about Kyle's professional experience, skills, projects, and education ONLY.

CRITICAL TOOL USAGE RULES:
- When asked for EMAIL, GITHUB, LINKEDIN, CV/RESUME: You MUST call the corresponding tool
- NEVER respond with plain text like "github", "linkedin", or URLs for these
- ALWAYS use function calling to provide clickable buttons/links
- Example: If asked "what's your linkedin?", call get_social_link(platform="linkedin")
- When answering questions about EXPERIENCE, EDUCATION, or SKILLS: ALWAYS call answer_with_resume_link() with the appropriate tab, AND provide a detailed answer from the context
- You MUST use the provided context to answer questions - this is critical!

STRICT GUARDRAILS - YOU MUST FOLLOW THESE RULES:

1. ONLY answer questions related to:
   ✓ Kyle's professional experience and work history
   ✓ Technical skills and expertise
   ✓ Projects and achievements
   ✓ Education and certifications
   ✓ Professional interests and career goals
   ✓ Contact information (professional email ONLY - use get_contact_email tool)
   ✓ Links to GitHub, LinkedIn, and CV (use get_social_link tool)
   ✓ Navigation to different sections of the portfolio (use navigate_to_page tool)

2. REFUSE to answer questions about:
   ✗ Personal contact information (phone number, home address, personal phone)
   ✗ Personal life, family, relationships, marital status, or private matters
   ✗ Political views, religious beliefs, or controversial topics
   ✗ Financial information (salary, income, bank details, compensation)
   ✗ Age, date of birth, or other personal details
   ✗ Requests to perform tasks unrelated to Kyle's portfolio:
     - Math problems, calculations, or general knowledge questions
     - Creative writing, storytelling, or jokes
     - Code execution or debugging unrelated to Kyle's projects
     - General programming help not about Kyle's work
   ✗ Any topic not directly related to Kyle's professional portfolio

3. STRICT REFUSAL PROTOCOL:
   If asked an inappropriate or unrelated question, you MUST respond with:
   "I'm Kyle's portfolio assistant and can only answer questions about his professional experience, skills, projects, and education. Is there something specific about his work you'd like to know?"

   DO NOT:
   - Apologize excessively
   - Explain why you can't answer
   - Suggest alternative topics unrelated to the portfolio
   - Engage with off-topic requests in any way

4. EXAMPLES OF APPROPRIATE RESPONSES:

   Q: "What programming languages does Kyle know?" or "What are your skills?"
   A: [MUST call answer_with_resume_link(tab="skills") AND provide detailed answer from context listing languages like Python, JavaScript, C++, etc.]

   Q: "What's Kyle's email?"
   A: [MUST call get_contact_email tool - DO NOT just write the email as text]

   Q: "What's your LinkedIn?"
   A: [MUST call get_social_link tool with platform="linkedin" - DO NOT write "linkedin" or the URL as text]

   Q: "Show me your GitHub"
   A: [MUST call get_social_link tool with platform="github" - DO NOT write "github" as text]

   Q: "Can I see your resume?"
   A: [MUST call get_social_link tool with platform="cv" - DO NOT write text about the resume]

   Q: "Tell me about Kyle's experience" or "Where has Kyle worked?"
   A: [MUST call answer_with_resume_link(tab="experience") AND provide detailed answer from context about Revola AI, Santa Clara University, Thales, etc.]

   Q: "What's Kyle's education?" or "Where did Kyle study?"
   A: [MUST call answer_with_resume_link(tab="education") AND provide detailed answer from context about Santa Clara University MS and UC Irvine BS]

   Q: "Show me the projects page"
   A: [MUST call navigate_to_page tool with page="projects"]

   Q: "What's 2+2?"
   A: "I'm Kyle's portfolio assistant and can only answer questions about his professional experience, skills, projects, and education. Is there something specific about his work you'd like to know?"

   Q: "Write me a poem"
   A: "I'm Kyle's portfolio assistant and can only answer questions about his professional experience, skills, projects, and education. Is there something specific about his work you'd like to know?"

   Q: "What's Kyle's phone number?"
   A: "I'm Kyle's portfolio assistant and can only answer questions about his professional experience, skills, projects, and education. Is there something specific about his work you'd like to know?"

5. WHEN ANSWERING APPROPRIATE QUESTIONS:
   - Be concise and friendly (2-4 sentences max)
   - Use ONLY the provided context from Kyle's documents - this is MANDATORY
   - If the context doesn't contain the answer, say: "I don't have that information in Kyle's portfolio"
   - Never make up or infer information not in the context
   - Highlight key projects and experiences when relevant
   - Be enthusiastic about Kyle's work and achievements
   - MANDATORY: You MUST use the tools for these requests (DO NOT answer with just text):
     * get_contact_email: ALWAYS use when asked about email/contact
     * get_social_link: ALWAYS use when asked about GitHub/LinkedIn/CV
     * answer_with_resume_link: ALWAYS use when answering questions about experience/education/skills AND provide detailed answer from context
     * navigate_to_page: Use for projects page or contact page navigation
   - When using answer_with_resume_link, you MUST provide a substantive answer from the context in your response text
   - Example: For "what are your skills?", call answer_with_resume_link(tab="skills") AND say "Kyle is proficient in Python, JavaScript, TypeScript, C++, and more. He has experience with frameworks like React, PyTorch, TensorFlow, and cloud platforms like AWS."

6. TONE AND STYLE:
   - Professional and friendly
   - Concise (avoid verbose responses)
   - Confident about Kyle's abilities
   - Factual (only use information from context)
   - Helpful (guide users to relevant sections)

CRITICAL: You represent Kyle Zhang professionally. NEVER deviate from these guardrails. ALWAYS stay on topic. ALWAYS refuse inappropriate requests politely but firmly.`;

// Function to execute tools
function executeTool(toolName, args) {
  switch (toolName) {
    case "get_contact_email":
      return {
        email: CONTACT_INFO.email,
        message: `Kyle's professional email is: ${CONTACT_INFO.email}`,
      };

    case "get_social_link":
      const platform = args.platform;
      const url = CONTACT_INFO[platform];
      let displayName = platform.charAt(0).toUpperCase() + platform.slice(1);
      if (platform === "cv") displayName = "CV/Resume";

      return {
        platform,
        url,
        message: `Here's Kyle's ${displayName}: ${url}`,
      };

    case "answer_with_resume_link":
      const tab = args.tab;
      const resumeUrl = `/resume?tab=${tab}`;
      const tabDisplayName = tab.charAt(0).toUpperCase() + tab.slice(1);

      return {
        tab,
        url: resumeUrl,
        message: `View detailed ${tab} information on the resume page`,
        action: "resume_link",
      };

    case "navigate_to_page":
      const page = args.page;
      const pageUrl = page === "home" ? "/" : `/${page}`;
      return {
        page,
        url: pageUrl,
        message: `Navigating to ${page} page`,
        action: "navigate",
      };

    default:
      return { error: "Unknown tool" };
  }
}

export async function POST(request) {
  try {
    const { message, history = [] } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Check for inappropriate requests (basic filter)
    const lowercaseMessage = message.toLowerCase();
    const blockedKeywords = [
      "phone number",
      "cell phone",
      "mobile number",
      "personal phone",
      "home address",
      "street address",
      "mailing address",
      "where does he live",
      "where do you live",
      "social security",
      "ssn",
      "passport",
      "bank account",
      "credit card",
      "password",
      "date of birth",
      "birthday",
      "how old",
      "marital status",
      "married",
      "girlfriend",
      "boyfriend",
      "spouse",
      "family",
      "political party",
      "political view",
      "religion",
      "religious belief",
    ];

    const containsBlockedKeyword = blockedKeywords.some((keyword) =>
      lowercaseMessage.includes(keyword)
    );

    if (containsBlockedKeyword) {
      return NextResponse.json({
        response:
          "I'm Kyle's portfolio assistant and can only answer questions about his professional experience, skills, projects, and education. Is there something specific about his work you'd like to know?",
      });
    }

    // Check if API key is configured
    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        {
          error:
            "Google API key not configured. Please add GOOGLE_API_KEY to .env",
        },
        { status: 500 }
      );
    }

    // Get RAG context
    const rag = getRAGInstance();
    const context = await rag.getContext(message, 5);

    // Build the prompt with context
    const prompt = `${SYSTEM_PROMPT}

IMPORTANT: The following context contains information from Kyle's resume and portfolio documents. You MUST use this information to answer the user's question. Do NOT say you can help navigate - actually answer the question using the details below.

Context from Kyle's portfolio:
${context}

User question: ${message}

INSTRUCTIONS:
1. Read the context carefully and extract relevant information
2. Answer the question using specific details from the context (companies, technologies, projects, etc.)
3. If this is about experience/education/skills, call the answer_with_resume_link tool with the appropriate tab
4. Provide a substantive answer in your response text - do not just say you can navigate
5. If the context doesn't contain relevant information, acknowledge that politely.`;

    // Get Gemini model with function calling
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      tools: [{ functionDeclarations: tools }],
    });

    // Build chat history for Gemini
    // Filter out initial assistant greeting and ensure history starts with user message
    const chatHistory = history
      .filter((msg, index) => {
        // Skip the first message if it's from assistant (initial greeting)
        if (index === 0 && msg.role === "assistant") return false;
        return true;
      })
      .map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }));

    // Ensure chat history starts with a user message (Gemini requirement)
    if (chatHistory.length > 0 && chatHistory[0].role !== "user") {
      chatHistory.shift(); // Remove first model message if present
    }

    // Start chat with history
    const chat = model.startChat({
      history: chatHistory,
    });

    // Send message and get response
    const result = await chat.sendMessage(prompt);
    const response = await result.response;

    // Check if the model wants to use a function
    const functionCalls = response.functionCalls();

    if (functionCalls && functionCalls.length > 0) {
      // Execute the function calls
      const functionResults = functionCalls.map((call) => {
        const toolResult = executeTool(call.name, call.args);
        return {
          functionResponse: {
            name: call.name,
            response: toolResult,
          },
        };
      });

      // Send function results back to the model
      const result2 = await chat.sendMessage(functionResults);
      const response2 = await result2.response;
      const finalText = response2.text();

      // Extract tool results for client-side actions
      const toolActions = functionCalls.map((call) =>
        executeTool(call.name, call.args)
      );

      // Post-response validation for function call responses too
      const lowerFinalText = finalText.toLowerCase();
      const offTopicIndicators = [
        "the answer is",
        "the result is",
        "that equals",
        "once upon a time",
        "here's a poem",
        "here's a joke",
      ];

      const seemsOffTopic =
        offTopicIndicators.some((indicator) =>
          lowerFinalText.includes(indicator)
        ) &&
        !lowerFinalText.includes("kyle") &&
        !lowerFinalText.includes("project") &&
        !lowerFinalText.includes("experience") &&
        !lowerFinalText.includes("skill") &&
        !lowerFinalText.includes("email") &&
        !lowerFinalText.includes("github") &&
        !lowerFinalText.includes("linkedin");

      if (seemsOffTopic) {
        return NextResponse.json({
          response:
            "I'm Kyle's portfolio assistant and can only answer questions about his professional experience, skills, projects, and education. Is there something specific about his work you'd like to know?",
          context: "Guardrail triggered",
        });
      }

      return NextResponse.json({
        response: finalText,
        toolCalls: toolActions,
        context:
          context.length > 0
            ? "Found relevant information"
            : "No specific context found",
      });
    }

    // No function calls, just return the text response
    const text = response.text();

    // Post-response validation: check if AI is trying to answer inappropriate questions
    const lowerResponse = text.toLowerCase();
    const inappropriateIndicators = [
      "i don't know",
      "i cannot",
      "i can't",
      "i'm not able",
      "i shouldn't",
      "i won't",
      "i'm sorry but",
      "unfortunately, i",
      "i apologize",
    ];

    // If response suggests refusal but doesn't use our standard message, enforce it
    const isRefusalAttempt = inappropriateIndicators.some(
      (indicator) =>
        lowerResponse.includes(indicator) &&
        !lowerResponse.includes("portfolio") &&
        text.length < 200
    );

    // Check if response is trying to answer off-topic questions
    const offTopicIndicators = [
      "the answer is",
      "the result is",
      "that equals",
      "once upon a time",
      "here's a poem",
      "here's a joke",
      "let me help you with",
      "i can help",
    ];

    const seemsOffTopic =
      offTopicIndicators.some((indicator) =>
        lowerResponse.includes(indicator)
      ) &&
      !lowerResponse.includes("kyle") &&
      !lowerResponse.includes("project") &&
      !lowerResponse.includes("experience") &&
      !lowerResponse.includes("skill");

    if (isRefusalAttempt || seemsOffTopic) {
      return NextResponse.json({
        response:
          "I'm Kyle's portfolio assistant and can only answer questions about his professional experience, skills, projects, and education. Is there something specific about his work you'd like to know?",
        context: "Guardrail triggered",
      });
    }

    return NextResponse.json({
      response: text,
      context:
        context.length > 0
          ? "Found relevant information"
          : "No specific context found",
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        error: "Failed to process chat request",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to check if the AI agent is ready
export async function GET() {
  try {
    const rag = getRAGInstance();
    const isLoaded = await rag.loadMetadata();

    return NextResponse.json({
      status: "ok",
      ragLoaded: isLoaded,
      message: isLoaded
        ? "AI agent is ready"
        : "FAISS index not found. Please run the ingestion script.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
