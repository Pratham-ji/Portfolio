import { describe, it, expect } from 'vitest';
import { FileSystemStore } from '../FileSystemStore';
import { catCommand } from '../../../apps/terminal/commands/cat';
import { lsCommand } from '../../../apps/terminal/commands/ls';
import { neofetchCommand } from '../../../apps/terminal/commands/neofetch';
import fs from 'fs';
import path from 'path';

describe('FileSystemStore & L6 QA Hotfixes', () => {
  it('primary directory structure under pratham contains all required directories', () => {
    const pratham = FileSystemStore.getNode('pratham');
    expect(pratham).toBeDefined();
    expect(pratham?.isDirectory).toBe(true);

    const children = FileSystemStore.getChildren('pratham');
    const childIds = children.map(c => c.id);

    expect(childIds).toContain('desktop');
    expect(childIds).toContain('projects');
    expect(childIds).toContain('algorithms');
    expect(childIds).toContain('user-system');
    expect(childIds).toContain('documents');
    expect(childIds).toContain('downloads');

    const systemDir = FileSystemStore.getNode('user-system');
    expect(systemDir?.name).toBe('System');
    expect(systemDir?.parentId).toBe('pratham');
    expect(systemDir?.childrenIds).toEqual(['demo-chai', 'vault-anushka']);
  });

  it('populates all 9 authentic portfolio files with rich content', () => {
    // 1. Resume_Prathamraj_Giri.paper
    const resume = FileSystemStore.getNode('resume-paper');
    expect(resume).toBeDefined();
    expect(resume?.name).toBe('Resume_Prathamraj_Giri.paper');
    expect(resume?.parentId).toBe('desktop');
    expect(resume?.content).toContain('Prathamraj Giri');
    expect(resume?.content).toContain('Graphic Era Hill University');
    expect(resume?.content).toContain('Class of 2026');
    expect(resume?.content).toContain('CGPA: 8.4');
    expect(resume?.content).toContain('THE ROOKIES');
    expect(resume?.content).toContain('Zidio Development');
    expect(resume?.content).toContain('Project LOOP');
    expect(resume?.content).toContain('Prodigy InfoTech');
    expect(resume?.content).toContain('ServiceNow');
    expect(resume?.content).toContain('Alpha Batch 5.0 DSA & AlgoZenith');

    // 2. Queue_FundMyCrazy_2026.md
    const queue = FileSystemStore.getNode('queue-fmc');
    expect(queue).toBeDefined();
    expect(queue?.name).toBe('Queue_FundMyCrazy_2026.md');
    expect(queue?.parentId).toBe('projects');
    expect(queue?.content).toContain('Google Fund My Crazy 2026');
    expect(queue?.content).toContain('WebRTC');
    expect(queue?.content).toContain('Redis');
    expect(queue?.content).toContain('< 15ms');
    expect(queue?.content).toContain('50,000');

    // 3. B2B_EdTech_RAG_AR.md
    const edtech = FileSystemStore.getNode('edtech-rag-ar');
    expect(edtech).toBeDefined();
    expect(edtech?.name).toBe('B2B_EdTech_RAG_AR.md');
    expect(edtech?.parentId).toBe('projects');
    expect(edtech?.content).toContain('Reciprocal Rank Fusion');
    expect(edtech?.content).toContain('WebGL / WebXR');
    expect(edtech?.content).toContain('NativeWind v4');
    expect(edtech?.content).toContain('Row-Level Security');

    // 4. Inventory_Flow_Supabase.md
    const inventory = FileSystemStore.getNode('inventory-flow');
    expect(inventory).toBeDefined();
    expect(inventory?.name).toBe('Inventory_Flow_Supabase.md');
    expect(inventory?.parentId).toBe('projects');
    expect(inventory?.content).toContain('pg_advisory_xact_lock');
    expect(inventory?.content).toContain('MotionScheduler');

    // 5. Project_LOOP_AI.md
    const loop = FileSystemStore.getNode('project-loop');
    expect(loop).toBeDefined();
    expect(loop?.name).toBe('Project_LOOP_AI.md');
    expect(loop?.parentId).toBe('projects');
    expect(loop?.content).toContain('Zidio Development');
    expect(loop?.content).toContain('HDBSCAN');
    expect(loop?.content).toContain('Jira');

    // 6. Shopify_Liquid_Engine.code
    const shopify = FileSystemStore.getNode('shopify-liquid');
    expect(shopify).toBeDefined();
    expect(shopify?.name).toBe('Shopify_Liquid_Engine.code');
    expect(shopify?.parentId).toBe('projects');
    expect(shopify?.content).toContain('pos-category-grid');
    expect(shopify?.content).toContain('navigator.geolocation');
    expect(shopify?.content).toContain('{% schema %}');

    // 7. LeetCode_3539_and_DP.cpp
    const leetcode = FileSystemStore.getNode('leetcode-cpp');
    expect(leetcode).toBeDefined();
    expect(leetcode?.name).toBe('LeetCode_3539_and_DP.cpp');
    expect(leetcode?.parentId).toBe('algorithms');
    expect(leetcode?.content).toContain('SolutionLC3539');
    expect(leetcode?.content).toContain('StreamZeroCompactor');
    expect(leetcode?.content).toContain('AlternatingScoreEngine');
    expect(leetcode?.content).toContain('StableIntervalTracker');
    expect(leetcode?.content).toContain('CyclicArrayPartitioner');

    // 8. demo.chai
    const chai = FileSystemStore.getNode('demo-chai');
    expect(chai).toBeDefined();
    expect(chai?.name).toBe('demo.chai');
    expect(chai?.parentId).toBe('user-system');
    expect(chai?.content?.trim()).toBe(`let x = 42\nlet msg = "Hello from ChaiScript!"\nprint(msg)`);

    // 9. .vault_anushka
    const vault = FileSystemStore.getNode('vault-anushka');
    expect(vault).toBeDefined();
    expect(vault?.name).toBe('.vault_anushka');
    expect(vault?.parentId).toBe('user-system');
    expect(vault?.content).toContain('VAULT ANUSHKA');
    expect(vault?.content).toContain('Dedicated to Anushka');
  });

  it('keeps 100k benchmark generator intact', () => {
    const bench = FileSystemStore.getNode('benchmark');
    expect(bench).toBeDefined();
    expect(bench?.childrenIds?.length).toBe(100);
    const firstFolder = FileSystemStore.getNode('bench-folder-0');
    expect(firstFolder?.childrenIds?.length).toBe(1000);
  });

  it('cat command reads files by name, relative path, and full path', async () => {
    // Read by relative path from pratham
    const resRel = await catCommand.execute(['System/demo.chai'], 'pratham');
    expect(resRel.lines.map(l => l.segments[0].text).join('\n')).toContain('Hello from ChaiScript!');

    // Read by direct name from user-system
    const resName = await catCommand.execute(['demo.chai'], 'user-system');
    expect(resName.lines.map(l => l.segments[0].text).join('\n')).toContain('let x = 42');

    // Read hidden file .vault_anushka
    const resHidden = await catCommand.execute(['.vault_anushka'], 'user-system');
    expect(resHidden.lines.map(l => l.segments[0].text).join('\n')).toContain('VAULT ANUSHKA');

    // Read by full path
    const resFull = await catCommand.execute(['/Users/pratham/System/.vault_anushka'], 'desktop');
    expect(resFull.lines.map(l => l.segments[0].text).join('\n')).toContain('Anushka (wifey / bhura)');

    // Error on directory
    const resDir = await catCommand.execute(['System'], 'pratham');
    expect(resDir.lines[0].segments[0].text).toContain('Is a directory');

    // Error on non-existent file
    const resMissing = await catCommand.execute(['ghost.txt'], 'pratham');
    expect(resMissing.lines[0].segments[0].text).toContain('No such file or directory');
  });

  it('ls command filters hidden files without -a and reveals them with -a', async () => {
    // Normal ls in user-system should NOT include .vault_anushka
    const normalLs = await lsCommand.execute([], 'user-system');
    const normalNames = normalLs.lines.map(l => l.segments[0].text);
    expect(normalNames).toContain('demo.chai');
    expect(normalNames).not.toContain('.vault_anushka');

    // ls -a in user-system SHOULD include .vault_anushka
    const hiddenLs = await lsCommand.execute(['-a'], 'user-system');
    const hiddenNames = hiddenLs.lines.map(l => l.segments[0].text);
    expect(hiddenNames).toContain('demo.chai');
    expect(hiddenNames).toContain('.vault_anushka');

    // ls projects from pratham
    const projLs = await lsCommand.execute(['Projects'], 'pratham');
    const projNames = projLs.lines.map(l => l.segments[0].text);
    expect(projNames).toContain('Queue_FundMyCrazy_2026.md');
    expect(projNames).toContain('B2B_EdTech_RAG_AR.md');
  });

  it('neofetch uses var(--pos-accent-brand) for optical apex ascii art', async () => {
    const result = await neofetchCommand.execute([], 'pratham');
    expect(result.lines.length).toBeGreaterThan(0);
    const firstSegment = result.lines[0].segments[0];
    expect(firstSegment.color).toBe('var(--pos-accent-brand)');
  });

  it('Settings.module.css uses var(--pos-accent-interactive) for toggleActive', () => {
    const cssPath = path.resolve(__dirname, '../../../apps/settings/Settings.module.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    expect(cssContent).toMatch(/\.toggleSwitch\.toggleActive\s*\{\s*background-color:\s*var\(--pos-accent-interactive,\s*#0a84ff\)\s*!important;/);
  });
});
