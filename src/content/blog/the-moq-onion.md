---
title: The MoQ Onion
description: >-
  An architectural breakdown of the layered protocol stack powering Media over
  QUIC (MoQ), tracing media delivery down through WebTransport, QUIC, and lower
  layers.
pubDate: '2024-11-17'
sourceName: moq.dev
sourceUrl: 'https://moq.dev/blog/moq-onion/'
tags:
  - moq
  - webtransport
  - quic
  - networking
generatedBy: ai
---

Understanding the encapsulation boundaries in Media over QUIC is critical as the ecosystem evaluates various transport layers and protocol forks. This post breaks down the entire MoQ protocol stack layer-by-layer to clarify how media payloads map onto WebTransport and QUIC. It serves as a concise conceptual reference for engineers seeking a high-level view of how modern low-latency streaming architectures fit together.
