"""
Test script to verify fetching all repositories for a GitHub user
"""

import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from github import Github
import logging

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)

def test_fetch_user_repos(username="kmzhang1"):
    """Test fetching all public repos for a user"""

    print(f"\n=== Testing Repository Fetch for User: {username} ===\n")

    try:
        # Initialize GitHub API (unauthenticated for testing)
        g = Github()

        # Get user
        print(f"Fetching user: {username}")
        user = g.get_user(username)

        print(f"\n✓ User found!")
        print(f"  Name: {user.name or 'N/A'}")
        print(f"  Bio: {user.bio or 'N/A'}")
        print(f"  Public Repos: {user.public_repos}")

        print(f"\n=== Public Repositories ===\n")

        # Get all public repositories
        repos = user.get_repos(type='public')

        repo_list = []
        for i, repo in enumerate(repos, 1):
            repo_list.append(repo.full_name)
            print(f"{i:2d}. {repo.full_name}")
            print(f"    Description: {repo.description or 'No description'}")
            print(f"    Language: {repo.language or 'N/A'}")
            print(f"    Stars: {repo.stargazers_count}")
            print(f"    Updated: {repo.updated_at}")
            print()

        print(f"✓ Found {len(repo_list)} public repositories!")
        print(f"\nRepository names:")
        for repo_name in repo_list:
            print(f"  - {repo_name}")

        return repo_list

    except Exception as e:
        print(f"\n✗ Error: {e}")
        import traceback
        traceback.print_exc()
        return []

if __name__ == "__main__":
    repos = test_fetch_user_repos("kmzhang1")
    sys.exit(0 if repos else 1)
