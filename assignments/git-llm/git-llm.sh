#!/bin/bash
# Making sure key is set
if [ -z "$OPENAI_API_KEY" ]; then
  echo "Error: OPENAI_API_KEY is not set."
  exit 1
fi

# Showing prompt file 
PROMPT_FILE="/Users/makspopov/Documents/CPSC_298/assignments/git-llm/prompt.xml"

# Does prompt exist
if [ ! -f "$PROMPT_FILE" ]; then
  echo "Error: Prompt file not found at $PROMPT_FILE."
  exit 1
fi

PROMPT_CONTENT=$(xmllint --xpath 'string(//system)' "$PROMPT_FILE")

echo "Prompt Content: $PROMPT_CONTENT"


# Run llm command
COMMIT_MESSAGE=$(llm --system "$PROMPT_CONTENT" --model text-davinci-003 --save summarize 2>&1)

echo "LLM Output: $COMMIT_MESSAGE"

# Making sure commit properly generated 
if [ -z "$COMMIT_MESSAGE" ]; then
  echo "Error: Failed to generate commit message."
  exit 1
fi

# Perform actual commit
git add .
git commit -m "$COMMIT_MESSAGE"
