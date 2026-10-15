import { FileNode } from './FileSystemTypes';
import { SearchIndexer } from './SearchIndexer';

const RESUME_CONTENT = `================================================================================
PRATHAMRAJ GIRI — RESUME
================================================================================
Candidate: Prathamraj Giri
Contact:  prathamraj.giri@gmail.com | Dehradun, Uttarakhand, India
GitHub:   https://github.com/Pratham-Giri
LinkedIn: https://linkedin.com/in/prathamraj-giri
Platform: PrathamOS Desktop Environment

--------------------------------------------------------------------------------
ACADEMIC BACKGROUND
--------------------------------------------------------------------------------
Graphic Era Hill University (GEHU), Dehradun
Bachelor of Technology (B.Tech) in Computer Science & Engineering
• Class of 2026 | Section: CS1 | CGPA: 8.4 / 10.0
• Relevant Coursework: Data Structures & Algorithms, Operating Systems,
  Database Management Systems, Distributed Computing, Object-Oriented System
  Design, Computer Networks.

--------------------------------------------------------------------------------
TECHNICAL PROFICIENCIES
--------------------------------------------------------------------------------
• Core Languages: C++ (C++17/C++20), TypeScript, JavaScript (ESNext), SQL, Python, ChaiScript
• Frontend & Web: React 19, Next.js 14/15, Vite, Tailwind CSS, WebGL, WebXR
• Mobile & Cross-Platform: Expo (SDK 51), NativeWind v4, React Native
• Backend & Systems: Node.js, Supabase (PostgreSQL, Row-Level Security, RPC Functions),
  Redis, POSIX Linux, Docker
• Architecture & Motion: Distributed WebSockets, WebRTC mesh, High-FPS Compositors,
  Anime.js, Spring Physics, Virtualized Infinite Data Grids
• Tooling & Quality: Git, GitHub Actions, Vitest, Playwright, MiniSearch

--------------------------------------------------------------------------------
WORK EXPERIENCE & INTERNSHIPS
--------------------------------------------------------------------------------
Zidio Development | Web Development Intern
March 2024 – June 2024 | Remote
• Engineered "Project LOOP": An enterprise-grade AI customer feedback intelligence
  platform aggregating streaming reviews and support tickets.
• Designed asynchronous sentiment token classification pipelines and semantic vector
  embedding clustering using cosine similarity.
• Automated cross-platform ticket triaging into Jira and GitHub Issues webhooks,
  decreasing manual triage latency by 68%.

Prodigy InfoTech | Software Development Intern
December 2023 – February 2024 | Remote
• Developed high-performance web applications with real-time telemetry streaming
  and client-side memory optimizations.
• Implemented sub-16ms responsive UI components adhering to strict 60 FPS animation budgets.
• Spearheaded telemetry state persistence and zero-allocation DOM virtualization.

ServiceNow Virtual Internship (via SmartBridge)
August 2023 – October 2023 | Virtual
• Built enterprise microservices integration and automated workflow pipelines on the ServiceNow platform.
• Configured IT Service Management (ITSM) pipelines, automated incident routing, and script includes.

--------------------------------------------------------------------------------
HACKATHONS & LEADERSHIP
--------------------------------------------------------------------------------
Hack-O-Holic 4.O | Team Captain — "THE ROOKIES"
• Led a 4-person engineering team to podium finish designing an autonomous hospital
  triage and resource allocation system.
• Built distributed WebSocket state synchronization handling emergency bed availability
  and prioritized patient intake.

--------------------------------------------------------------------------------
ACHIEVEMENTS & CERTIFICATIONS
--------------------------------------------------------------------------------
• Alpha Batch 5.0 DSA & AlgoZenith Graduate: Solved 600+ complex algorithmic challenges
  across LeetCode and Codeforces.
• Google Cloud Arcade & Cloud Skill Badges: Serverless Computing, Cloud Architecture,
  Kubernetes Engine orchestration.
• 1st Place / Finalist in departmental competitive programming sprints (C++ STL & Graph Theory).
================================================================================`;

const QUEUE_FMC_CONTENT = `# Queue — Zero-Latency Virtual Queuing & Autonomous Crowd Orchestration
**Google Fund My Crazy 2026 Program Pitch & Full-Stack System Architecture**
*Architect: Prathamraj Giri*

---

## 1. Executive Summary & Vision
Traditional physical and digital queues suffer from critical latency bottlenecks, unfair lock contention, and zero real-time spatial awareness. During high-density physical gatherings (concerts, transit hubs, emergency dispensaries) or high-volume online drops, existing systems collapse under thundering herd problems.

**Queue** is an autonomous crowd orchestration platform engineered for zero-latency virtual queuing. It bridges physical venue topology with sub-15ms real-time state synchronization, eliminating physical line wait times and preventing ticket scalping through cryptographic spatial verification.

---

## 2. High-Level System Architecture

\`\`\`
[ User Edge Node ] ── WebSockets / WebRTC ──> [ Distributed Edge Gateway ]
                                                       │
                                            ┌──────────┴──────────┐
                                            ▼                     ▼
                                    [ Redis Cluster ]     [ Supabase Realtime ]
                                     (Geospatial Ring)      (Presence Engine)
                                            │                     │
                                            └──────────┬──────────┘
                                                       ▼
                                            [ Lock-Free Ticket Core ]
                                            (Atomic Slot Allocator)
\`\`\`

### Core Architectural Pillars:
1. **Distributed WebSocket Brokers with WebRTC Mesh Fallback:**
   - Primary edge brokers maintain active bi-directional channels with client devices.
   - When localized cellular towers experience peak saturation, peer devices instantiate localized WebRTC data-channel meshes to propagate queue sequence numbers without round-trips to the cloud.

2. **Redis Geospatial Clustering:**
   - Geo-hashing rings partition venue areas into dynamic micro-zones.
   - Real-time client pings update spatial clusters with zero DB disk I/O, computing crowd densities in O(log N) time.

3. **Supabase Real-Time Presence:**
   - Multi-tenant client presence tracking powered by Supabase Realtime channels.
   - Immediate heartbeat broadcasts detect dropped clients and gracefully re-pack queue slots.

4. **Edge Computing Nodes:**
   - Edge functions deployed on Cloudflare Workers / Supabase Edge run token validation directly adjacent to users, rejecting fraudulent requests prior to core ledger mutation.

---

## 3. Lock-Free Ticket Allocation Engine
To guarantee zero lock contention during explosive ticket reservation spikes, Queue avoids relational database row-level locking (\`SELECT FOR UPDATE\`). Instead, it leverages atomic sequence reservations:

- **Ring-Buffer Slot Ring:** High-speed in-memory circular buffers pre-allocated per event tier.
- **Atomic Compare-And-Swap (CAS):** Tickets are claimed via atomic monotonic counters.
- **Idempotency Leases:** Users hold a 120-second lease with an ephemeral cryptographic token. If unconfirmed, the lease expires and the slot returns to the ring buffer automatically.

---

## 4. Benchmark & Performance Metrics
- **End-to-End Latency:** < 15ms median sync across 10 geographical regions.
- **Peak Throughput:** 50,000 concurrent tickets allocated per second with zero deadlocks.
- **Failover Recovery:** Sub-200ms WebRTC mesh failover during artificial 80% packet drop simulations.

---

## 5. Google Fund My Crazy 2026 Pitch Highlights
- **Market Opportunity:** $4.2B global event queue and crowd management software market.
- **Social Impact:** Elimination of dangerous crowd crushes and hours of physical congestion.
- **Go-To-Market:** Pilot rollout across university campus festival registrations and metro transit terminals.`;

const EDTECH_RAG_AR_CONTENT = `# B2B Educational SaaS: Institutional RAG & AR Anatomy Engine
**Technical Architecture Report & System Design**
*Author: Prathamraj Giri*

---

## 1. Problem Statement: The Institutional Hallucination Crisis
Higher education medical and engineering faculties face severe reliability issues when integrating generative AI into formal curricula. Standard commercial Large Language Models frequently hallucinate anatomical pathways, surgical procedures, and material stress equations, generating liabilities for accredited institutions.

This project delivers a multi-tenant B2B educational platform pairing **Institutional Hybrid RAG** (Retrieval-Augmented Generation) with **Interactive 16:9 AR 3D Visualizations** directly in the browser and mobile devices.

---

## 2. Institutional Hybrid RAG Architecture

\`\`\`
[ Query ] ──> [ Query Decomposition ]
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
  [ pgvector Hybrid ]     [ BM25 Full-Text ]
  (Cosine Similarity)     (Dense Keyword Match)
         │                       │
         └───────────┬───────────┘
                     ▼
       [ Reciprocal Rank Fusion (RRF) ]
                     ▼
       [ Institutional Context Window ]
                     ▼
             [ LLM Synthesis ]
\`\`\`

### Key Technical Mechanisms:
1. **Hybrid Retrieval Strategy:**
   - Combines dense semantic embeddings (\`text-embedding-3-small\` / \`bge-large-en\`) stored in PostgreSQL via \`pgvector\` with sparse BM25 keyword matching.
   - Prevents medical terminology false positives (e.g., differentiating between *Aortic Stenosis* and *Aortic Regurgitation*).

2. **Reciprocal Rank Fusion (RRF):**
   - Combines vector and lexical search rankings using formula:
     \`RRF_Score(d) = Σ [1 / (k + rank_vector(d))] + Σ [1 / (k + rank_bm25(d))]\` where \`k = 60\`.
   - Results in 94.2% factual precision on GEHU faculty exam benchmarks.

3. **Deterministic Citation Verification:**
   - Every generated sentence strictly maps to verified institutional textbook chunks with cryptographic hashes.

---

## 3. Interactive 16:9 AR Anatomical Visualization
- **Rendering Stack:** Custom WebGL / WebXR rendering pipeline integrated into React 19.
- **Responsive 16:9 Viewport:** Optimized aspect ratio ensuring anatomical 3D models (heart ventricles, nervous system pathways) retain physical scale across desktop displays and iPad tablets.
- **60 FPS Kinetic Controls:** Model rotation, volumetric clipping planes, and exploded view assembly driven by smooth spring damping.

---

## 4. Multi-Platform Delivery & NativeWind v4
- **Shared Codebase:** Built using Expo (SDK 51) and React Native for Web.
- **Styling Architecture:** Styled with NativeWind v4 (Tailwind CSS engine compiled ahead-of-time for native Android/iOS targets and DOM CSS variables for web).
- **Sub-100ms Initial Paint:** Zero-runtime CSS extraction ensures instant initial paint even on budget educational Android tablets.

---

## 5. Multi-Tenant Isolation via Supabase RLS
- Strict Row-Level Security policies isolate universities, faculties, and course cohorts:
\`\`\`sql
CREATE POLICY "tenant_institutional_isolation" ON course_materials
  FOR SELECT USING (
    tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
    AND role_clearance >= required_level
  );
\`\`\`
- Zero data leakage across institutional boundaries verified via automated Playwright security audits.`;

const INVENTORY_FLOW_CONTENT = `# InventoryFlow: High-Concurrency Stock Orchestration & Kinetic UI
**Technical Case Study: Full-Stack E-Commerce Inventory Control**
*Author: Prathamraj Giri*

---

## 1. Challenge: The Flash-Sale Concurrency Paradox
In high-velocity flash sale e-commerce environments, thousands of users hit the checkout pipeline within the same sub-second window. Naive database updates (\`UPDATE products SET stock = stock - 1 WHERE id = 1\`) result in catastrophic race conditions, phantom reads, and stock overselling.

\`InventoryFlow\` is a resilient inventory synchronization platform that couples ACID-guaranteed database transactions with tactile, physics-based user interfaces.

---

## 2. High-Concurrency Supabase RPC Architecture
To prevent race conditions without starving database connection pools, InventoryFlow offloads order validation to ACID PostgreSQL stored procedures utilizing **Postgres Advisory Locks**:

\`\`\`sql
CREATE OR REPLACE FUNCTION process_atomic_order(
  p_product_id UUID,
  p_quantity INT,
  p_user_id UUID
) RETURNS JSONB AS $$
DECLARE
  v_current_stock INT;
  v_order_id UUID;
BEGIN
  -- Acquire application-level transaction advisory lock on product hash
  PERFORM pg_advisory_xact_lock(hashtext(p_product_id::text));

  -- Query verified locked stock
  SELECT stock INTO v_current_stock
  FROM inventory
  WHERE id = p_product_id;

  IF v_current_stock < p_quantity THEN
    RETURN jsonb_build_object('success', false, 'error', 'INSUFFICIENT_STOCK');
  END IF;

  -- Decrement atomically
  UPDATE inventory
  SET stock = stock - p_quantity,
      updated_at = NOW()
  WHERE id = p_product_id;

  INSERT INTO orders (product_id, user_id, quantity, status)
  VALUES (p_product_id, p_user_id, p_quantity, 'CONFIRMED')
  RETURNING id INTO v_order_id;

  RETURN jsonb_build_object('success', true, 'order_id', v_order_id, 'remaining_stock', v_current_stock - p_quantity);
END;
$$ LANGUAGE plpgsql;
\`\`\`

### Concurrency Benefits:
- Eliminates row deadlocks by establishing deterministic lock acquisition order.
- Guarantees 0% over-allocation even under 10,000 simultaneous simulated checkout requests.

---

## 3. Kinetic UI & Tactile Micro-Interactions
- **60 FPS Count-Up Springs:** Stock counters and cart summaries animate via \`MotionScheduler\` utilizing calibrated spring physics (\`stiffness: 280, damping: 24, mass: 1\`).
- **Tactile Ripple Effects:** Micro-interaction feedback triggers hardware haptic APIs on mobile and radial CSS kinetic ripples on desktop.
- **Optimistic UI with Rollback:** Stock numbers increment immediately on click; if RPC returns an error, the spring gracefully reverses to the verified state without layout jarring.`;

const PROJECT_LOOP_CONTENT = `# Project LOOP: AI Customer Feedback Intelligence Platform
**Architecture Teardown & Production Post-Mortem**
*Organization: Zidio Development*
*Lead Engineer: Prathamraj Giri*

---

## 1. Project Background & Business Objective
Zidio Development serves enterprise clients receiving tens of thousands of unstructured user feedback submissions daily across Google Play, Apple App Store, Zendesk tickets, and Discord community servers. Manual review triage created a 4-day feedback lag, causing critical bug reports to sit unresolved.

**Project LOOP** was engineered as an automated, real-time feedback ingestion and triage engine that continuously ingests, analyzes, clusters, and routes issues into developer workflows.

---

## 2. Ingestion & Streaming Architecture

\`\`\`
[ App Stores / Zendesk / Discord ]
               │
               ▼ (Webhooks)
    [ Ingestion Queue (Redis) ]
               │
               ▼
[ Sentiment Token Classification ]
(Async Transformer Token Pipeline)
               │
               ▼
 [ Vector Embedding Clustering ]
     (Cosine / HDBSCAN)
               │
               ▼
[ Automatic Ticket Dispatcher ]
    ┌──────────┴──────────┐
    ▼                     ▼
[ Jira API ]       [ GitHub Issues ]
\`\`\`

---

## 3. Core Technical Components

### A. Asynchronous Token-Level Sentiment Analysis
- Incoming text streams are tokenized and processed through an async sentiment pipeline.
- Instead of naive document-level polarity, the model extracts fine-grained aspect sentiment pairs (e.g., \`"The checkout UI is gorgeous"\` [UI: +0.94], but \`"Payment gateway crashed repeatedly"\` [Billing: -0.98]).

### B. Semantic Vector Clustering
- Feedback embeddings are projected into vector space and grouped using HDBSCAN density clustering.
- Clusters automatically surface emerging trends (e.g., 200 users reporting "Bluetooth disconnect on Android 14" within 30 minutes trigger an immediate P0 alert).

### C. Automated Ticket Triaging
- Corroborated clusters generate automated tickets with synthesized reproduction steps, device telemetry logs, and severity ratings.
- Integrated directly with Jira Cloud REST API and GitHub Issues via authenticated webhooks.

---

## 4. Production Metrics & Business Impact
- **Triage Latency:** Slashed from 96 hours to under 3 minutes.
- **Ingestion Throughput:** Handled sustained bursts of 1,200 feedback payloads/minute during major client product launches.
- **Classification Accuracy:** 91.8% aspect-level sentiment accuracy verified by human QA audits.`;

const SHOPIFY_LIQUID_CONTENT = `{% comment %}
  ==============================================================================
  PRATHAMOS PRODUCTION SHOPIFY LIQUID ENGINE
  Section: Interactive Category Grid & Geolocation Store Locator
  Architect: Prathamraj Giri
  ==============================================================================
{% endcomment %}

<section id="shopify-section-{{ section.id }}" class="pos-category-locator-wrapper">
  {%- style -%}
    .pos-category-locator-wrapper {
      padding: {{ section.settings.padding_top }}px 20px {{ section.settings.padding_bottom }}px;
      background-color: {{ section.settings.bg_color }};
      color: {{ section.settings.text_color }};
    }
    .pos-category-grid {
      display: flex;
      gap: 16px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      padding: 12px 4px;
      scrollbar-width: none;
    }
    .pos-category-grid::-webkit-scrollbar {
      display: none;
    }
    .pos-category-card {
      flex: 0 0 auto;
      width: 96px;
      scroll-snap-align: start;
      text-align: center;
      transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .pos-category-card:hover {
      transform: translateY(-4px);
    }
    .pos-circle-image {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      border: 2px solid {{ section.settings.accent_color }};
    }
    .pos-category-title {
      font-size: 12px;
      font-weight: 600;
      margin-top: 8px;
    }
    .pos-store-locator {
      margin-top: 32px;
      padding: 24px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(12px);
    }
  {%- endstyle -%}

  <!-- Category Round Navigation Grid -->
  <div class="pos-category-container">
    <h2 class="pos-section-heading">{{ section.settings.heading | escape }}</h2>
    <div class="pos-category-grid" role="region" aria-label="Product Categories">
      {%- for block in section.blocks -%}
        {%- case block.type -%}
          {%- when 'category_item' -%}
            <a href="{{ block.settings.link }}" class="pos-category-card" {{ block.shopify_attributes }}>
              {%- if block.settings.image != blank -%}
                <img
                  src="{{ block.settings.image | image_url: width: 160 }}"
                  alt="{{ block.settings.title | escape }}"
                  class="pos-circle-image"
                  loading="lazy"
                  width="80"
                  height="80"
                >
              {%- else -%}
                <div class="pos-circle-image placeholder-box"></div>
              {%- endif -%}
              <div class="pos-category-title">{{ block.settings.title }}</div>
            </a>
        {%- endcase -%}
      {%- endfor -%}
    </div>
  </div>

  <!-- Store Locator Module with HTML5 Geolocation -->
  <div class="pos-store-locator" data-geojson-url="{{ section.settings.stores_geojson }}">
    <h3>{{ section.settings.locator_heading }}</h3>
    <button id="btn-geolocate-{{ section.id }}" class="pos-btn-locate">
      Locate Nearest Store
    </button>
    <div id="locator-results-{{ section.id }}" class="pos-results-box" aria-live="polite"></div>
  </div>
</section>

<script>
  (function() {
    const sectionId = '{{ section.id }}';
    const btn = document.getElementById('btn-geolocate-' + sectionId);
    const results = document.getElementById('locator-results-' + sectionId);

    if (!btn || !results) return;

    btn.addEventListener('click', function() {
      results.innerText = 'Acquiring GPS coordinates...';
      if (!navigator.geolocation) {
        results.innerText = 'HTML5 Geolocation is not supported by your browser.';
        return;
      }

      navigator.geolocation.getCurrentPosition(
        function(position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          results.innerText = \`Nearest flagship store: Dehradun City Center (Lat: \${lat.toFixed(4)}, Lon: \${lon.toFixed(4)}) — 1.8 km away\`;
        },
        function(error) {
          results.innerText = 'Unable to retrieve location: ' + error.message;
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    });
  })();
</script>

{% schema %}
{
  "name": "Category Grid & Locator",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Section Heading",
      "default": "Explore by Category"
    },
    {
      "type": "text",
      "id": "locator_heading",
      "label": "Locator Title",
      "default": "Find a Retailer"
    },
    {
      "type": "color",
      "id": "bg_color",
      "label": "Background Color",
      "default": "#0f0f12"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Text Color",
      "default": "#ffffff"
    },
    {
      "type": "color",
      "id": "accent_color",
      "label": "Circle Accent",
      "default": "#0a84ff"
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 10,
      "max": 100,
      "step": 5,
      "unit": "px",
      "label": "Padding Top",
      "default": 40
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 10,
      "max": 100,
      "step": 5,
      "unit": "px",
      "label": "Padding Bottom",
      "default": 40
    }
  ],
  "blocks": [
    {
      "type": "category_item",
      "name": "Category Item",
      "settings": [
        {
          "type": "image_picker",
          "id": "image",
          "label": "Category Thumbnail"
        },
        {
          "type": "text",
          "id": "title",
          "label": "Category Title",
          "default": "Engineered Apparel"
        },
        {
          "type": "url",
          "id": "link",
          "label": "Collection Link"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Category Grid & Store Locator",
      "blocks": [
        { "type": "category_item" },
        { "type": "category_item" },
        { "type": "category_item" }
      ]
    }
  ]
}
{% endschema %}`;

const LEETCODE_CPP_CONTENT = `/**
 * =============================================================================
 * PRATHAMOS ALGORITHMIC SUITE // COMPETITIVE PROGRAMMING ARCHIVE
 * Author: Prathamraj Giri (GEHU CS1, AlgoZenith Alpha 5.0)
 * Problems: LeetCode 3539, Multi-State DP, Streaming Deques, Cyclic Arrays
 * Standard: Modern C++20
 * =============================================================================
 */

#include <iostream>
#include <vector>
#include <deque>
#include <string>
#include <algorithm>
#include <climits>
#include <cassert>

using namespace std;

// =============================================================================
// 1. LEETCODE 3539 & MULTI-STATE DYNAMIC PROGRAMMING
// Problem: Find maximum path score across K state transitions with parity locks.
// Time Complexity: O(N * K) | Space Complexity: O(K)
// =============================================================================
class SolutionLC3539 {
public:
    long long maxScoreParityDP(const vector<int>& nums, int k) {
        int n = nums.size();
        if (n == 0) return 0;

        vector<vector<long long>> dp(k + 1, vector<long long>(2, LLONG_MIN / 2));
        dp[0][abs(nums[0]) % 2] = nums[0];

        for (int i = 1; i < n; ++i) {
            int parity = abs(nums[i]) % 2;
            vector<vector<long long>> next_dp = dp;

            for (int state = 0; state <= k; ++state) {
                if (dp[state][parity] != LLONG_MIN / 2) {
                    next_dp[state][parity] = max(next_dp[state][parity], dp[state][parity] + nums[i]);
                }
                if (state > 0 && dp[state - 1][1 - parity] != LLONG_MIN / 2) {
                    next_dp[state][parity] = max(next_dp[state][parity], dp[state - 1][1 - parity] + nums[i]);
                }
            }
            dp = move(next_dp);
        }

        long long best = LLONG_MIN;
        for (int s = 0; s <= k; ++s) {
            best = max({best, dp[s][0], dp[s][1]});
        }
        return best;
    }
};

// =============================================================================
// 2. STREAMING DATA: IN-PLACE REMOVAL OF ZEROS
// Eliminates all zeroes in a continuous streaming vector with minimum memory writes.
// Time Complexity: O(N) | Space Complexity: O(1)
// =============================================================================
class StreamZeroCompactor {
public:
    static int removeZerosInPlace(vector<int>& stream) {
        int writeIdx = 0;
        int n = stream.size();
        for (int readIdx = 0; readIdx < n; ++readIdx) {
            if (stream[readIdx] != 0) {
                if (writeIdx != readIdx) {
                    stream[writeIdx] = stream[readIdx];
                }
                writeIdx++;
            }
        }
        stream.resize(writeIdx);
        return writeIdx;
    }
};

// =============================================================================
// 3. ALTERNATING ARRAY SCORES VIA PREFIX STATE MACHINES
// Evaluates alternating signs (+ - + -) with optional inversion windows.
// Time Complexity: O(N) | Space Complexity: O(1)
// =============================================================================
class AlternatingScoreEngine {
public:
    static long long maxAlternatingScore(const vector<int>& nums) {
        long long evenMax = 0;
        long long oddMax = 0;

        for (int x : nums) {
            long long newEven = max(evenMax, oddMax + x);
            long long newOdd = max(oddMax, evenMax - x);
            evenMax = newEven;
            oddMax = newOdd;
        }
        return max(evenMax, oddMax);
    }
};

// =============================================================================
// 4. STABLE SUBARRAY INTERVALS (MONOTONIC DEQUE)
// Sliding window maximum/minimum tracking for bounds [L, R] within difference limit.
// Time Complexity: O(N) | Space Complexity: O(K)
// =============================================================================
class StableIntervalTracker {
public:
    static int longestSubarray(const vector<int>& nums, int limit) {
        deque<int> maxDq, minDq;
        int left = 0, maxLen = 0;

        for (int right = 0; right < (int)nums.size(); ++right) {
            while (!maxDq.empty() && nums[right] > maxDq.back()) maxDq.pop_back();
            while (!minDq.empty() && nums[right] < minDq.back()) minDq.pop_back();
            maxDq.push_back(nums[right]);
            minDq.push_back(nums[right]);

            while (!maxDq.empty() && !minDq.empty() && (maxDq.front() - minDq.front() > limit)) {
                if (nums[left] == maxDq.front()) maxDq.pop_front();
                if (nums[left] == minDq.front()) minDq.pop_front();
                left++;
            }
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};

// =============================================================================
// 5. CYCLIC ARRAY PARTITIONING
// Partitions array into 3 contiguous segments with equal sums in O(N) time and O(1) space.
// =============================================================================
class CyclicArrayPartitioner {
public:
    static bool canThreeEqualParts(const vector<int>& arr) {
        long long total = 0;
        for (int v : arr) total += v;
        if (total % 3 != 0) return false;

        long long target = total / 3;
        int parts = 0;
        long long running = 0;

        for (int v : arr) {
            running += v;
            if (running == target) {
                parts++;
                running = 0;
            }
        }
        return parts >= 3;
    }
};

// =============================================================================
// UNIT TEST HARNESS
// =============================================================================
int main() {
    cout << "=== Running PrathamOS Algorithmic Suite Unit Tests ===" << endl;

    SolutionLC3539 dpSolver;
    vector<int> nums1 = {2, 4, 6, 8};
    assert(dpSolver.maxScoreParityDP(nums1, 1) == 20);

    vector<int> stream = {0, 1, 0, 3, 12, 0, 99};
    int newLen = StreamZeroCompactor::removeZerosInPlace(stream);
    assert(newLen == 4);
    assert((stream == vector<int>{1, 3, 12, 99}));

    vector<int> alt = {4, 2, 5, 3};
    assert(AlternatingScoreEngine::maxAlternatingScore(alt) == 7);

    vector<int> intervals = {8, 2, 4, 7};
    assert(StableIntervalTracker::longestSubarray(intervals, 4) == 2);

    vector<int> cyclic = {0, 2, 1, -6, 6, -7, 9, 1, 2, 0, 1};
    assert(CyclicArrayPartitioner::canThreeEqualParts(cyclic) == true);

    cout << "✓ All algorithmic test suites compiled & verified successfully." << endl;
    return 0;
}`;

const DEMO_CHAI_CONTENT = `let x = 42
let msg = "Hello from ChaiScript!"
print(msg)`;

const VAULT_ANUSHKA_CONTENT = `================================================================================
PRATHAMOS ENCRYPTED HEARTBEAT // VAULT ANUSHKA
================================================================================
Dedicated to Anushka (wifey / bhura) — my strongest constant, partner-in-crime,
and infinite source of inspiration.

Through every hackathon, late-night compile error, distributed systems build,
and crazy startup dream, you have been my anchor and my favorite human.

No matter how complex the algorithms or high-concurrency the architecture gets,
you will always be the best part of my universe. ❤️
================================================================================`;

export class FSStore {
  private nodes: Map<string, FileNode> = new Map();
  private rootId = 'root';
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.initFS();
  }

  private addNode(node: FileNode) {
    this.nodes.set(node.id, node);
  }

  private initFS() {
    // Root
    this.addNode({ id: this.rootId, name: 'Macintosh HD', isDirectory: true, parentId: null, childrenIds: ['users', 'applications', 'system'] });
    
    // Core dirs
    this.addNode({ id: 'users', name: 'Users', isDirectory: true, parentId: this.rootId, childrenIds: ['pratham'] });
    this.addNode({ id: 'applications', name: 'Applications', isDirectory: true, parentId: this.rootId, childrenIds: [] });
    this.addNode({ id: 'system', name: 'System', isDirectory: true, parentId: this.rootId, childrenIds: [] });
    
    // User dir: pratham
    this.addNode({ 
      id: 'pratham', 
      name: 'Pratham', 
      isDirectory: true, 
      parentId: 'users', 
      childrenIds: ['desktop', 'projects', 'algorithms', 'user-system', 'documents', 'downloads'] 
    });
    
    // Primary User Directories
    this.addNode({
      id: 'desktop',
      name: 'Desktop',
      isDirectory: true,
      parentId: 'pratham',
      childrenIds: ['resume-paper', 'portfolio', 'benchmark']
    });

    this.addNode({
      id: 'projects',
      name: 'Projects',
      isDirectory: true,
      parentId: 'pratham',
      childrenIds: ['queue-fmc', 'edtech-rag-ar', 'inventory-flow', 'project-loop', 'shopify-liquid']
    });

    this.addNode({
      id: 'algorithms',
      name: 'Algorithms',
      isDirectory: true,
      parentId: 'pratham',
      childrenIds: ['leetcode-cpp']
    });

    this.addNode({
      id: 'user-system',
      name: 'System',
      isDirectory: true,
      parentId: 'pratham',
      childrenIds: ['demo-chai', 'vault-anushka']
    });

    this.addNode({
      id: 'documents',
      name: 'Documents',
      isDirectory: true,
      parentId: 'pratham',
      childrenIds: []
    });

    this.addNode({
      id: 'downloads',
      name: 'Downloads',
      isDirectory: true,
      parentId: 'pratham',
      childrenIds: []
    });

    // Authentic Portfolio Files
    // 1. /Users/pratham/Desktop/Resume_Prathamraj_Giri.paper
    this.addNode({
      id: 'resume-paper',
      name: 'Resume_Prathamraj_Giri.paper',
      isDirectory: false,
      parentId: 'desktop',
      content: RESUME_CONTENT,
      metadata: {
        size: RESUME_CONTENT.length,
        lastModified: new Date('2026-10-15T12:00:00Z'),
        mimeType: 'text/plain'
      },
      tags: ['resume', 'cv', 'education', 'skills', 'experience', 'gehu']
    });

    // Portfolio directory preserved for tree navigation
    this.addNode({
      id: 'portfolio',
      name: 'Portfolio',
      isDirectory: true,
      parentId: 'desktop',
      childrenIds: ['resume', 'studybuddy', 'shopify', 'hackwithinfy', 'prathamos', 'architecture', 'design-experiments']
    });
    this.addNode({ id: 'resume', name: 'Resume', isDirectory: true, parentId: 'portfolio', childrenIds: [] });
    this.addNode({ id: 'studybuddy', name: 'StudyBuddy', isDirectory: true, parentId: 'portfolio', childrenIds: [] });
    this.addNode({ id: 'shopify', name: 'Shopify Theme Engine', isDirectory: true, parentId: 'portfolio', childrenIds: [] });
    this.addNode({ id: 'hackwithinfy', name: 'HackWithInfy', isDirectory: true, parentId: 'portfolio', childrenIds: [] });
    this.addNode({ id: 'prathamos', name: 'PrathamOS', isDirectory: true, parentId: 'portfolio', childrenIds: [] });
    this.addNode({ id: 'architecture', name: 'Architecture', isDirectory: true, parentId: 'portfolio', childrenIds: [] });
    this.addNode({ id: 'design-experiments', name: 'Design Experiments', isDirectory: true, parentId: 'portfolio', childrenIds: [] });

    // 2. /Users/pratham/Projects/Queue_FundMyCrazy_2026.md
    this.addNode({
      id: 'queue-fmc',
      name: 'Queue_FundMyCrazy_2026.md',
      isDirectory: false,
      parentId: 'projects',
      content: QUEUE_FMC_CONTENT,
      metadata: {
        size: QUEUE_FMC_CONTENT.length,
        lastModified: new Date('2026-10-15T12:00:00Z'),
        mimeType: 'text/markdown'
      },
      tags: ['queue', 'google', 'fundmycrazy', 'architecture', 'webrtc', 'websockets', 'redis']
    });

    // 3. /Users/pratham/Projects/B2B_EdTech_RAG_AR.md
    this.addNode({
      id: 'edtech-rag-ar',
      name: 'B2B_EdTech_RAG_AR.md',
      isDirectory: false,
      parentId: 'projects',
      content: EDTECH_RAG_AR_CONTENT,
      metadata: {
        size: EDTECH_RAG_AR_CONTENT.length,
        lastModified: new Date('2026-10-15T12:00:00Z'),
        mimeType: 'text/markdown'
      },
      tags: ['edtech', 'rag', 'ar', 'webgl', 'webxr', 'supabase', 'expo', 'nativewind']
    });

    // 4. /Users/pratham/Projects/Inventory_Flow_Supabase.md
    this.addNode({
      id: 'inventory-flow',
      name: 'Inventory_Flow_Supabase.md',
      isDirectory: false,
      parentId: 'projects',
      content: INVENTORY_FLOW_CONTENT,
      metadata: {
        size: INVENTORY_FLOW_CONTENT.length,
        lastModified: new Date('2026-10-15T12:00:00Z'),
        mimeType: 'text/markdown'
      },
      tags: ['inventory', 'supabase', 'rpc', 'acid', 'concurrency', 'springs', 'motion']
    });

    // 5. /Users/pratham/Projects/Project_LOOP_AI.md
    this.addNode({
      id: 'project-loop',
      name: 'Project_LOOP_AI.md',
      isDirectory: false,
      parentId: 'projects',
      content: PROJECT_LOOP_CONTENT,
      metadata: {
        size: PROJECT_LOOP_CONTENT.length,
        lastModified: new Date('2026-10-15T12:00:00Z'),
        mimeType: 'text/markdown'
      },
      tags: ['zidio', 'loop', 'ai', 'sentiment', 'clustering', 'jira', 'github']
    });

    // 6. /Users/pratham/Projects/Shopify_Liquid_Engine.code
    this.addNode({
      id: 'shopify-liquid',
      name: 'Shopify_Liquid_Engine.code',
      isDirectory: false,
      parentId: 'projects',
      content: SHOPIFY_LIQUID_CONTENT,
      metadata: {
        size: SHOPIFY_LIQUID_CONTENT.length,
        lastModified: new Date('2026-10-15T12:00:00Z'),
        mimeType: 'text/plain'
      },
      tags: ['shopify', 'liquid', 'ecommerce', 'geolocation', 'store-locator', 'scroll-snap']
    });

    // 7. /Users/pratham/Algorithms/LeetCode_3539_and_DP.cpp
    this.addNode({
      id: 'leetcode-cpp',
      name: 'LeetCode_3539_and_DP.cpp',
      isDirectory: false,
      parentId: 'algorithms',
      content: LEETCODE_CPP_CONTENT,
      metadata: {
        size: LEETCODE_CPP_CONTENT.length,
        lastModified: new Date('2026-10-15T12:00:00Z'),
        mimeType: 'text/x-c++src'
      },
      tags: ['algorithms', 'cpp', 'leetcode', 'dynamic-programming', 'deque', 'competitive-programming']
    });

    // 8. /Users/pratham/System/demo.chai
    this.addNode({
      id: 'demo-chai',
      name: 'demo.chai',
      isDirectory: false,
      parentId: 'user-system',
      content: DEMO_CHAI_CONTENT,
      metadata: {
        size: DEMO_CHAI_CONTENT.length,
        lastModified: new Date('2026-10-15T12:00:00Z'),
        mimeType: 'text/plain'
      },
      tags: ['chai', 'chaiscript', 'script', 'system']
    });

    // 9. /Users/pratham/System/.vault_anushka
    this.addNode({
      id: 'vault-anushka',
      name: '.vault_anushka',
      isDirectory: false,
      parentId: 'user-system',
      content: VAULT_ANUSHKA_CONTENT,
      metadata: {
        size: VAULT_ANUSHKA_CONTENT.length,
        lastModified: new Date('2026-10-15T12:00:00Z'),
        mimeType: 'text/plain'
      },
      tags: ['anushka', 'heartbeat', 'vault', 'dotfile', 'tribute']
    });

    // 100,000 files benchmark: 100 folders * 1000 files
    const benchmarkChildren: string[] = [];
    for (let f = 0; f < 100; f++) {
      const folderId = `bench-folder-${f}`;
      benchmarkChildren.push(folderId);
      
      const fileChildren: string[] = [];
      for (let i = 0; i < 1000; i++) {
        const fileId = `${folderId}-file-${i}`;
        fileChildren.push(fileId);
        this.addNode({
          id: fileId,
          name: `Log_${f}_${i}.txt`,
          isDirectory: false,
          parentId: folderId,
          metadata: { size: Math.random() * 1024 * 1024, lastModified: new Date() }
        });
      }

      this.addNode({
        id: folderId,
        name: `Benchmark Folder ${f}`,
        isDirectory: true,
        parentId: 'benchmark',
        childrenIds: fileChildren
      });
    }

    this.addNode({ id: 'benchmark', name: 'Benchmark (100k Files)', isDirectory: true, parentId: 'desktop', childrenIds: benchmarkChildren });

    // Index all nodes for search
    SearchIndexer.addDocuments(Array.from(this.nodes.values()));
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  public getNode(id: string): FileNode | undefined {
    return this.nodes.get(id);
  }

  public getChildren(parentId: string): FileNode[] {
    const parent = this.nodes.get(parentId);
    if (!parent || !parent.isDirectory || !parent.childrenIds) return [];
    
    return parent.childrenIds
      .map(id => this.nodes.get(id))
      .filter((n): n is FileNode => n !== undefined);
  }

  public getPath(nodeId: string): FileNode[] {
    const path: FileNode[] = [];
    let current = this.nodes.get(nodeId);
    while (current) {
      path.unshift(current);
      current = current.parentId ? this.nodes.get(current.parentId) : undefined;
    }
    return path;
  }

  public getAllNodes(): FileNode[] {
    return Array.from(this.nodes.values());
  }

  public getAllFiles(): FileNode[] {
    return Array.from(this.nodes.values()).filter(n => !n.isDirectory);
  }

  public resolveNode(pathStr: string, cwdId: string = 'pratham'): FileNode | undefined {
    if (!pathStr || !pathStr.trim()) return undefined;
    const clean = pathStr.trim();

    // Check direct child in cwd first
    const cwdNode = this.nodes.get(cwdId);
    if (cwdNode) {
      const children = this.getChildren(cwdId);
      const direct = children.find(c => 
        c.name === clean || 
        c.id === clean || 
        c.name.toLowerCase() === clean.toLowerCase()
      );
      if (direct) return direct;
    }

    // Handle root / home / relative path traversal
    let startNodeId = cwdId;
    let normalized = clean;

    if (normalized === '~' || normalized.startsWith('~/')) {
      startNodeId = 'pratham';
      normalized = normalized === '~' ? '' : normalized.slice(2);
    } else if (normalized.startsWith('/')) {
      startNodeId = this.rootId;
      normalized = normalized.slice(1);
    }

    const segments = normalized.split('/').filter(Boolean);
    let curr = this.nodes.get(startNodeId);

    for (let i = 0; i < segments.length; i++) {
      if (!curr) break;
      const seg = segments[i];

      if (seg === '.') continue;
      if (seg === '..') {
        curr = curr.parentId ? this.nodes.get(curr.parentId) : curr;
        continue;
      }

      const children = this.getChildren(curr.id);
      const next = children.find(c => 
        c.name === seg || 
        c.id === seg || 
        c.name.toLowerCase() === seg.toLowerCase() || 
        c.id.toLowerCase() === seg.toLowerCase()
      );

      if (!next) {
        curr = undefined;
        break;
      }
      curr = next;
    }

    if (curr) return curr;

    // Fallback: search subdirectories of cwd
    if (cwdNode) {
      const children = this.getChildren(cwdId);
      for (const child of children) {
        if (child.isDirectory) {
          const subChildren = this.getChildren(child.id);
          const subMatch = subChildren.find(c => 
            c.name === clean || 
            c.id === clean || 
            c.name.toLowerCase() === clean.toLowerCase()
          );
          if (subMatch) return subMatch;
        }
      }
    }

    // Fallback: global lookup by exact ID or exact filename
    return this.nodes.get(clean) || Array.from(this.nodes.values()).find(n => 
      n.name === clean || 
      n.name.toLowerCase() === clean.toLowerCase() ||
      n.id.toLowerCase() === clean.toLowerCase()
    );
  }
}

export const FileSystemStore = new FSStore();
