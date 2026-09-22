---
title: Running LiveKit on Kubernetes without hostNetwork using STUNner
description: >-
  A guide on deploying self-hosted LiveKit on Kubernetes without hostNetwork by
  using STUNner as a Kubernetes-native WebRTC ingress gateway.
pubDate: '2026-09-21'
sourceName: WebRTC.ventures
sourceUrl: >-
  https://webrtc.ventures/2026/09/livekit-kubernetes-without-hostnetwork-stunner/
tags:
  - webrtc
  - kubernetes
  - livekit
  - sfu
generatedBy: ai
---

Running WebRTC media servers in Kubernetes typically requires host networking, which breaks container isolation and causes policy issues in security-conscious environments. This walkthrough shows how pairing LiveKit with STUNner lets your SFU pods remain private behind standard ClusterIP services. It is a practical reference architecture if you need to run media workloads without abandoning cloud-native networking practices.
