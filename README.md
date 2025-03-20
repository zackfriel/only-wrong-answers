# Only Wrong Answers

This app ***should*** only return incorrect responses.\
I simply had an hour free and decided to see if I *could*.\
It can be found hosted here:\
https://only-wrong-answers.vercel.app

## How it was made

I decided to try Vercel's v0 AI. This little chat bot allows you to pass prompts to it and it will build a React components for you. I haven't tried to see if it would build other components as I only needed it to build NextJS for me. 

Here is a link to it if you would like to try it yourself:
https://v0.dev/

With some back and fourth and perseverence, I managed to get v0 to give me a final result I was happy with.

All I needed to do then was do some minor refactoring - such as removing deprecated packages and unneccessary files - and I had to hook my `API_KEY` in as a `.env`.

## Findings

Now, using an AI like v0 did make this a very simple project. It built the basic structure, used tailwind for simplicity and gave me substantial reasoning as to why it had done certain things.

However, it also sometimes proved frustrating with the results I recieved from some simple prompts.\
For example, the first couple iterations of the results did not work at all. They gave varied errors. Another instance was that I asked v0 change the font to 'Comic Sans' (for the memes), and v0 decided to rewrite my entire app...

Wrapping things up, I would probably use v0 again to create a quick mock up or a proof of concept, but I wouldn't feel 100% confident shipping a professional site or app using only this. I still had to go through, santity check the code, hook up keys, remove rendundant file and change deprecated packages. 

## Running it locally

To run this app locally it's really simple.

Here are the easy steps: 
- Fork the repo
- Create an `.env.local` file
- Insert a new `API_KEY` value
- Setup your OpenAI API account
- Add your key to the `.env.local` value for the `API_KEY`
- Run `npm i`
- Run `npm run dev`