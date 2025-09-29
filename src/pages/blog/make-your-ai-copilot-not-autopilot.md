---
layout: ../../layouts/BlogLayout.astro
title: Make AI Your Copilot, Not Your Autopilot
description: A few weeks ago, my company, QuestionPro.com, provided a subscription for GitHub Copilot. I hadn't used AI to write code entirely and had never "vibe coded" before. So, I thought I'd experiment with it.
tags: ["github", "ai", "copilot", "programming"]
time: 10
featured: true
timestamp: 2025-09-29
filename: make-your-ai-copilot-not-autopilot
---

A few weeks ago, my company, [QuestionPro](questionpro.com), provided a subscription for GitHub Copilot. I hadn't used AI to write code entirely and had never "vibe coded" before. So, I thought I'd experiment with it.

TL;DR: I'm not going to vibe code again!

#### My Failed Experiment

Maybe it was my lack of _vibe code experience_, but I couldn't get it to work very well. I wanted to create a sync manager to sync my local data to the cloud. I'm not a backend engineer, so I described to the AI what I wanted to do. It gave me a detailed PRD, which I then fed to my agent—in this case, Copilot. It created some files, but they didn't work. I shared the error, it fixed something, and then it failed to work again. After some back and forth, it finally worked (or so I thought).

And guess what? It had created four files with around 600 lines of code, most of which were unnecessarily complex, and I was too ignorant to understand them.

#### The Nightmare of Maintenance

The code worked, but a few days later, I needed to add a new feature. I asked the AI, added the feature, it failed, and after more back and forth, it finally succeeded by adding 300 more lines of code and two new files. As a developer from the pre-AI era, I didn't like this process.

So, I learned the APIs, chatted with the AI about the paradigms of syncing and common issues, and then I rewrote the whole thing myself. The result was two files and less than 250 lines of code. It was much simpler, and now I actually know how my syncing works. Now, when I have to update a feature, it's a matter of minutes.

Yes, writing all the functions myself took about twice as long, but it was worth it in the long run. And to be honest, watching the agent work was incredibly boring. In contrast, writing the code myself was much more fun.

### How to use AI: My take

Personally, I think that as a software professional, you should only "vibe code" as a hobby or an experiment. Most of the time, you must use your own NI (Natural Intelligence). Here are some of my suggestions for how I use AI to code:

1. **For autocompletion.** AI tools like Copilot or Supermaven can be great autocompletion partners. They index your entire codebase and suggest code. The best part is when they suggest something tedious, like a list of names or a function to convert text to sentence case. These are things you already know. However, I don't like multi-line suggestions. Just when you're thinking, "Okay, I need to write this and that," boom—it gives you a suggestion. Some might say that's a good thing, right? But in reality, every suggestion can make you a weaker problem-solver. That's why I prefer tools like Neovim that only show single-line suggestions. I'd suggest you try [Zed](https://zed.dev/) and it's _subtle_ autocompletion. **Note:** For developers just starting out, I strongly recommend turning off AI auto-suggestions. Over-reliance on them can drastically hinder the development of your own problem-solving capacity.

2. **As a brainstorming partner.** One of the best things about AI is that it's a great conversational partner. So, whenever you feel the urge to ask an AI for code, stop. Instead, ask it _how_ you can solve the problem. Don't ask it to write the code for you; ask for guidance on how you can write it yourself. This way, you will actually understand the code. An AI is tireless, so ask it even the "dumbest" questions you have. FYI, no question is dumb when you're learning. (In life? Well, that's another story!)

3. **To reinforce your learning.** When you write code by hand, you truly know what you're writing. It gets etched in your brain. In my childhood, teachers used to say that writing something once is more valuable than reading it ten times. The major pain point of AI code comes later: when you need to update a feature, you find yourself in an oblivious state. And what do you do? You ask the AI to fix it again! But if you had written the code yourself, you can often pinpoint the exact line you need to update. So, don't just read the code an AI writes; write your own.

4. **For the boring stuff.** Another great use for AI is code review. After completing a module, share the code with an AI and ask if it sees any scope for improvement or any visible bugs. Analyze its suggestions and implement improvements as you see fit. AI is also excellent for writing documentation and test cases. In summary, give the boring tasks to the AI and keep the interesting ones for yourself.

5. **As a research buddy.** Finally, I love programming. The best part is that with just a few lines of text, you can create amazing things from nothing. If you are someone who wants to excel, push yourself not to use AI to write your code or solve problems for you. Instead, use it as a friend or that helpful colleague who comes over and says, "Hey, have you tried this approach or that trick?" Most importantly, make the AI your research buddy.

Those are my thoughts on AI. There are a lot of things to learn, to build, and to enjoy in this field. Don't make AI your frenemy; make it your friend.

---

**What about you? How do you balance using AI tools without letting them take over your thinking process? Share your experiences in the comments below!**
