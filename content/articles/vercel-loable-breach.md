---
title: "Vercel breach, Lovable mess: same story, different week"
summary: "A Vercel-linked breach via Context.ai and a separate Lovable vulnerability show the same pattern: weak human links, exposed tokens, and teams realizing too late that ‘not a breach’ does not mean ‘no risk’."
date: "2026-04-21"
category: "Security"
author: "Sahil"
source: "https://hackread.com/vercel-breach-context-ai-shinyhunters-not-involved/"
---

Vercel had a security incident. Not a clean infra hack. Not some crazy zero-day.  
A third-party integration got compromised and that was enough.

Context.ai employee account gets popped → OAuth tokens abused → access escalates into Vercel systems.

Some customer credentials may have been exposed.  
Crypto teams panic. Keys rotated. Damage control starts.

At the same time, Lovable says “no breach” while people point out their API let anyone access private stuff if you knew how.

Different companies. Same pattern.

## What actually happened

- Attack started outside Vercel  
- Context.ai employee Google Workspace got compromised  
- OAuth tokens used to move laterally into Vercel integration  
- Potential exposure of API keys and configs  
- Vercel says core secrets storage held up  

Parallel mess:

- Lovable had public project data exposure issues  
- Reports of BOLA-style access to chats, code, credentials  
- Issue known weeks earlier, not fixed properly  

This is not one incident. This is a category.

## Brutally honest take

This is not AI going rogue.  
This is humans being the weakest link again.

People love saying “AI risk” like Terminator is loading.

Reality:
- employee installs or clicks wrong thing  
- tokens get leaked  
- access chains are too open  
- nobody notices fast enough  

That is the breach.

AI did not hack Vercel.  
Bad access hygiene did.

## The uncomfortable truth

We have built systems where:

- one compromised account can cascade into multiple systems  
- OAuth tokens are treated like candy  
- third-party tools have too much access  
- “integration” = “trust everything blindly”  

And then we act surprised.

## The bigger pattern

Look at recent stuff:

- source leaks  
- internal tools exposed  
- chat histories accessible  
- API keys sitting in places they should not  

It is the same root issue:

- access is easy  
- control is weak  
- visibility is poor  

AI is just increasing the blast radius.

## What actually matters now

If you are building anything serious:

- assume every token can leak  
- assume every integration can be abused  
- assume logs are not enough  

And act like it.

## What you should do immediately

- rotate all API keys  
- audit OAuth apps and revoke anything unnecessary  
- check logs for unusual access patterns  
- lock down least privilege across integrations  
- treat “public” settings as truly public, not “probably safe”  

If you have EU users:

- this is not optional  
- GDPR does not care whose fault it was  
- exposure = obligation  

## The real shift

People are asking:
“Are humans riskier than AI now?”

Wrong framing.

Humans have always been the risk.  
Now systems are powerful enough that one mistake scales instantly.

AI did not create the problem.  
It just made the consequences faster and bigger.

## Bottom line

This week is not special.

It is just visible.

Same mistakes:
- too much trust  
- too much access  
- not enough control  

Different headlines.

Fix the fundamentals or keep rotating keys every month.