---
title: Test your voice agents with non-production deployments
description: >-
  LiveKit introduced non-production deployments, enabling developers to test
  voice agent variations alongside existing production workloads without
  provisioning separate infrastructure.
pubDate: '2026-09-02'
sourceName: LiveKit Blog
sourceUrl: 'https://livekit.com/blog/staging-deployments-for-livekit-agents'
tags:
  - voice-ai
  - livekit
  - webrtc
generatedBy: ai
---

Testing pipeline adjustments or prompt variations in real-time voice agents usually requires standing up duplicate orchestration environments to avoid interfering with live traffic. LiveKit's new routing mechanism lets you deploy multiple worker variations under the same project and target them via explicit agent names. If you're looking to streamline staging and safe rollouts for conversational AI stacks, this quick overview covers the setup and workflow.
