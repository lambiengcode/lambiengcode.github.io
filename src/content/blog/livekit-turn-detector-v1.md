---
title: "Solving End-of-Turn Detection: LiveKit Turn Detector v1.0"
description: "LiveKit's Turn Detector v1 listens to speech directly instead of waiting on a transcript, fusing semantic and acoustic signals for end-of-turn detection across 14 languages."
pubDate: 2026-06-17
sourceName: "LiveKit Blog"
sourceUrl: "https://livekit.com/blog/solving-end-of-turn-detection"
tags: ["voice-ai", "livekit"]
generatedBy: "manual"
---

Turn detection has been one of the more embarrassing failure modes in voice
agents — cutting users off mid-sentence or leaving dead air. Fusing acoustic
signal (pitch, pacing) with semantic understanding instead of waiting on
transcript-only heuristics is the interesting part of this release.
