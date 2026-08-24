---
title: Vector Vibing to speed up Opus encode by 20%
description: >-
  tl;dr: Opus encoding just got 20% faster on desktop Chromium by turning on
  AVX2 vectorization in libopus. Vectorization means one instruction doing the
  same arithmetic on a whole vector of values at once instead of one at a time.
  Codecs spend their hot loops running identical mat
pubDate: '2026-07-02'
sourceName: webrtcHacks
sourceUrl: 'https://webrtchacks.com/vector-vibing-to-speed-up-opus-encode-by-20/'
tags: []
generatedBy: raw
---

tl;dr: Opus encoding just got 20% faster on desktop Chromium by turning on AVX2 vectorization in libopus. Vectorization means one instruction doing the same arithmetic on a whole vector of values at once instead of one at a time. Codecs spend their hot loops running identical math across long buffers of samples, exactly where vectorization […] The post Vector Vibing to speed up Opus encode by 20% appeared first on webrtcHacks.
