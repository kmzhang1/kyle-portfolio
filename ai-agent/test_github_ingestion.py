"""
Test script for GitHub repository ingestion
"""

import sys
import logging
from github import Github

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)

def test_github_ingestion():
    """Simple test of GitHub API access"""

    print("\n=== Testing GitHub API Access ===\n")

    # Initialize GitHub API (unauthenticated for testing)
    g = Github()

    # Test with a small public repository
    repo_name = "octocat/Hello-World"

    try:
        print(f"Fetching repository: {repo_name}")
        repo = g.get_repo(repo_name)

        print(f"\n✓ Repository found!")
        print(f"  Name: {repo.full_name}")
        print(f"  Description: {repo.description}")
        print(f"  Stars: {repo.stargazers_count}")
        print(f"  Language: {repo.language}")

        print(f"\n=== Fetching Files ===\n")

        # Get repository contents
        contents = repo.get_contents("")

        file_count = 0
        for content_file in contents:
            if content_file.type == "file":
                file_count += 1
                print(f"  - {content_file.path} ({content_file.size} bytes)")

                # Try to read one file as a test
                if content_file.path == "README":
                    import base64
                    file_content = base64.b64decode(content_file.decoded_content).decode('utf-8')
                    print(f"\n=== README Content Preview ===")
                    print(file_content[:200] + "...")

        print(f"\n✓ Successfully accessed {file_count} files!")
        print(f"\n✓ GitHub ingestion is working correctly!")

        return True

    except Exception as e:
        print(f"\n✗ Error: {e}")
        return False

if __name__ == "__main__":
    success = test_github_ingestion()
    sys.exit(0 if success else 1)
