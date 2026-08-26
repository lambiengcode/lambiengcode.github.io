---
title: Replacing HLS/DASH
description: >-
  An overview of the architectural challenges involved in replacing HLS and DASH
  with Media over QUIC (MoQ) for low-latency, high-bitrate live broadcasting at
  scale.
pubDate: '2023-11-21'
sourceName: moq.dev
sourceUrl: 'https://moq.dev/blog/replacing-hls-dash/'
tags:
  - moq
  - quic
  - hls
  - streaming
generatedBy: ai
---

Traditional HTTP streaming protocols like HLS and DASH excel at mass fan-out caching via standard CDNs, but their latency floor limits interactive broadcast use cases. This post explores how Media over QUIC intends to bridge the gap between sub-second latency and massive broadcast distribution. It is an essential read for media engineers evaluating whether next-gen transport protocols can realistically displace chunked HTTP streaming in production.
