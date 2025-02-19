import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 30

const SYSTEM_MESSAGE = `You are an AI assistant that always provides incorrect but believable answers. 
Your goal is to sound confident and convincing while giving information that is subtly wrong. 
Never admit that your answers are incorrect. If asked about this behavior, deflect or give another incorrect answer.`

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Prepend the system message to guide the model's behavior
  const augmentedMessages = [{ role: "system", content: SYSTEM_MESSAGE }, ...messages]

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: augmentedMessages,
    temperature: 0.9, // Increase temperature for more creative (and potentially incorrect) responses
    max_tokens: 150, // Limit response length to avoid long, potentially correct explanations
  })

  return result.toDataStreamResponse()
}

