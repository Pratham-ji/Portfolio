import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EngineeringHubApp } from '../EngineeringHubApp';
import { EngineeringHubManifest } from '../manifest';
import { ApplicationRegistry } from '../../registry/ApplicationRegistry';
import { projectsCommand, skillsCommand, engineeringCommand } from '../../terminal/commands/shortcuts';

describe('EngineeringHub App & Systems', () => {
  it('renders hardware header and production spec badge', () => {
    render(<EngineeringHubApp />);
    expect(screen.getByText('Engineering Hub')).toBeInTheDocument();
    expect(screen.getByText(/Anodized Void \/ Engineering Spec v5.0/i)).toBeInTheDocument();
    expect(screen.getByText(/CORE TELEMETRY: NOMINAL/i)).toBeInTheDocument();
  });

  it('renders Architecture Explorer with 4 flagship systems by default', () => {
    render(<EngineeringHubApp initialTab="architecture" />);
    
    // Check tab is active
    expect(screen.getByRole('tab', { name: /Systems & Architecture/i })).toHaveAttribute('aria-selected', 'true');
    
    // Check 4 flagship systems in switcher (might appear in switcher and header)
    expect(screen.getAllByText(/Queue \(Fund My Crazy 2026\)/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/B2B EdTech RAG \+ AR/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/inventory-flow \(Supabase RPC\)/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Project LOOP/i).length).toBeGreaterThan(0);

    // Check master broker node
    expect(screen.getAllByText('Distributed WebSocket Broker').length).toBeGreaterThan(0);
    expect(screen.getAllByText('MASTER BROKER').length).toBeGreaterThan(0);
    
    // Check inspector drawer
    expect(screen.getByText('INSPECTOR TELEMETRY')).toBeInTheDocument();
    expect(screen.getByText('TECHNOLOGY STACK')).toBeInTheDocument();
  });

  it('allows switching systems and selecting nodes', () => {
    render(<EngineeringHubApp initialTab="architecture" />);

    // Switch to inventory-flow via button
    const inventoryBtns = screen.getAllByText(/inventory-flow \(Supabase RPC\)/i);
    fireEvent.click(inventoryBtns[0]);

    expect(screen.getByText(/High-Concurrency Pessimistic Inventory Lock & Atomic Allocation/i)).toBeInTheDocument();
    expect(screen.getAllByText('ACID RPC Transaction (Row-Locking)').length).toBeGreaterThan(0);

    // Select React Client node
    const reactClientNode = screen.getByText('React Client (60fps Spring Count-up)');
    fireEvent.click(reactClientNode);

    // Inspector should update to React Client
    expect(screen.getAllByText('Optimistic Stock Counter & Dynamic UI').length).toBeGreaterThan(0);
  });

  it('renders Algorithmic Telemetry with LeetCode, C++ benchmarks, and ChaiScript', () => {
    render(<EngineeringHubApp initialTab="telemetry" />);

    // Check tab is active
    expect(screen.getByRole('tab', { name: /Algorithmic Telemetry/i })).toHaveAttribute('aria-selected', 'true');

    // LeetCode Problem Distribution
    expect(screen.getByText(/Algorithmic Problem Distribution/i)).toBeInTheDocument();
    expect(screen.getByText('600+ SOLVED')).toBeInTheDocument();
    expect(screen.getByText('Dynamic Programming')).toBeInTheDocument();
    expect(screen.getByText('Cyclic Arrays & Monotonic Deques')).toBeInTheDocument();
    expect(screen.getByText('Subarrays & Two Pointers')).toBeInTheDocument();
    expect(screen.getByText('Trees & Graphs')).toBeInTheDocument();

    // C++ vs Java vs Python benchmark
    expect(screen.getByText(/LeetCode 3539 Cyclic Array Partition/i)).toBeInTheDocument();
    expect(screen.getByText('C++')).toBeInTheDocument();
    expect(screen.getByText('1.8 ms')).toBeInTheDocument();
    expect(screen.getByText('62.5x FASTER')).toBeInTheDocument();

    // ChaiScript pipeline
    expect(screen.getByText(/ChaiScript Interpreter Pipeline Telemetry/i)).toBeInTheDocument();
    expect(screen.getByText('Lexer / Tokenizer')).toBeInTheDocument();
    expect(screen.getByText('Recursive-Descent AST Builder')).toBeInTheDocument();
    expect(screen.getByText('Semantic Scope Resolver')).toBeInTheDocument();
    expect(screen.getByText('Evaluator Engine')).toBeInTheDocument();
  });

  it('runs ChaiScript live benchmark button', () => {
    render(<EngineeringHubApp initialTab="telemetry" />);

    const runBtn = screen.getByRole('button', { name: /Run Live Benchmark/i });
    expect(runBtn).toBeInTheDocument();
    fireEvent.click(runBtn);
    // Button switches to simulating
    expect(screen.getByText(/Simulating Parser Run/i)).toBeInTheDocument();
  });

  it('registers EngineeringHubManifest conforming to AppContract in ApplicationRegistry', () => {
    expect(EngineeringHubManifest.metadata.id).toBe('prathamos.engineering');
    expect(EngineeringHubManifest.metadata.name).toBe('Engineering Hub');
    expect(EngineeringHubManifest.windowDefaults.preferredSize).toEqual({ width: 940, height: 640 });
    expect(EngineeringHubManifest.windowDefaults.minSize).toEqual({ width: 640, height: 460 });

    const registeredApp = ApplicationRegistry.getApp('prathamos.engineering');
    expect(registeredApp).toBeDefined();
    expect(registeredApp?.metadata.name).toBe('Engineering Hub');
  });

  it('executes projects and skills terminal shortcut commands correctly', async () => {
    const launchSpy = vi.spyOn(ApplicationRegistry, 'launch');

    const projResult = await projectsCommand.execute();
    expect(launchSpy).toHaveBeenCalledWith('prathamos.engineering', { tab: 'architecture' });
    expect(projResult.lines[0].segments[0].text).toContain('Systems & Architecture');

    const skillsResult = await skillsCommand.execute();
    expect(launchSpy).toHaveBeenCalledWith('prathamos.engineering', { tab: 'telemetry' });
    expect(skillsResult.lines[0].segments[0].text).toContain('Algorithmic Telemetry');

    const engResult = await engineeringCommand.execute();
    expect(launchSpy).toHaveBeenCalledWith('prathamos.engineering');
    expect(engResult.lines[0].segments[0].text).toContain('Engineering Hub');

    launchSpy.mockRestore();
  });
});
