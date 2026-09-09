---
title: What does "inference is slower than realtime" mean?
description: >-
  LiveKit explains the causes of "inference is slower than realtime" errors in
  voice agents and outlines practical strategies to diagnose and resolve audio
  pipeline bottlenecks.
pubDate: '2026-09-09'
sourceName: LiveKit Blog
sourceUrl: 'https://livekit.com/blog/inference-is-slower-than-realtime'
tags:
  - voice-ai
  - webrtc
  - livekit
  - audio
generatedBy: ai
---

In conversational voice pipelines, generating audio slower than real-time playback guarantees stuttering, latency buildup, and broken interactions. This post breaks down how pipeline delays across STT, LLM, and TTS models trigger buffer underruns and what telemetry to inspect. It is a solid quick-reference guide if you are profiling voice agent responsiveness and trying to hunt down throughput bottlenecks.
