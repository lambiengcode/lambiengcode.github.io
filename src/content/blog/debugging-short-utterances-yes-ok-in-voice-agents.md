---
title: 'Debugging short utterances ("yes", "ok") in voice agents'
description: >-
  A guide exploring why conversational voice agents often drop or fail to
  respond to short user utterances like 'yes' or 'ok', and how to debug the
  underlying pipeline.
pubDate: '2026-08-24'
sourceName: LiveKit Blog
sourceUrl: 'https://livekit.com/blog/short-utterances'
tags:
  - voice-ai
  - vad
  - webrtc
generatedBy: ai
---

Short utterances expose brittle edge cases in voice pipelines where VAD sensitivity, minimum speech duration, and turn-taking heuristics easily collide. When building real-time audio agents over WebRTC, misconfigured silence detection or STT filtering often leads to awkward agent silence. This post walks through practical troubleshooting steps across transcription and endpointing layers to ensure quick confirmations aren't lost.
