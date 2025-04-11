import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import GridWorld from './components/GridWorld';
import SimulationController from './components/SimulationController';
import InfoPanel from './components/InfoPanel';
import GridEnvironment from './game/GridEnvironment';

function App() {
  const [gridSize, setGridSize] = useState(10);
  const [agents, setAgents] = useState([]);
  const [resources, setResources] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [step, setStep] = useState(0);
  const envRef = useRef(null);
  const intervalRef = useRef(null);

  // Initialize the environment
  useEffect(() => {
    const initialAgentConfigs = [
      { id: 1, x: 1, y: 1, learningRate: 0.1, explorationRate: 0.2 },
      { id: 2, x: 8, y: 8, learningRate: 0.1, explorationRate: 0.2 }
    ];
    
    const env = new GridEnvironment(gridSize, gridSize);
    env.initialize(initialAgentConfigs, 5);
    
    envRef.current = env;
    updateState();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [gridSize]);

  // Update state from environment
  const updateState = () => {
    if (!envRef.current) return;
    
    const state = envRef.current.getState();
    setAgents(state.agents);
    setResources(state.resources);
    setStep(state.step);
  };

  // Run a single step
  const handleStep = () => {
    if (!envRef.current) return;
    
    envRef.current.runStep();
    updateState();
  };

  // Start the simulation
  const handleStart = () => {
    if (isRunning || !envRef.current) return;
    
    setIsRunning(true);
    const intervalTime = 1000 / speed;
    
    intervalRef.current = setInterval(() => {
      envRef.current.runStep();
      updateState();
    }, intervalTime);
  };

  // Stop the simulation
  const handleStop = () => {
    if (!isRunning) return;
    
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  // Reset the simulation
  const handleReset = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
    
    const initialAgentConfigs = [
      { id: 1, x: 1, y: 1, learningRate: 0.1, explorationRate: 0.2 },
      { id: 2, x: 8, y: 8, learningRate: 0.1, explorationRate: 0.2 }
    ];
    
    const env = new GridEnvironment(gridSize, gridSize);
    env.initialize(initialAgentConfigs, 5);
    
    envRef.current = env;
    updateState();
  };

  // Change simulation speed
  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    
    if (isRunning) {
      clearInterval(intervalRef.current);
      const intervalTime = 1000 / newSpeed;
      
      intervalRef.current = setInterval(() => {
        envRef.current.runStep();
        updateState();
      }, intervalTime);
    }
  };

  // Update agent parameters
  const handleAgentParamChange = (agentId, params) => {
    if (!envRef.current) return;
    
    envRef.current.updateAgentParameters(agentId, params);
  };

  // Handle grid cell click
  const handleCellClick = (x, y) => {
    // Optional: Implement interaction with the grid
    console.log(`Cell clicked: (${x}, ${y})`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Evolve.io: RL Civilization Builder</h1>
        <p>An educational game about reinforcement learning</p>
      </header>
      
      <main className="App-main">
        <div className="simulation-area">
          <div className="grid-section">
            <h2>Grid World - Step: {step}</h2>
            <GridWorld 
              gridSize={gridSize}
              agents={agents}
              resources={resources}
              onCellClick={handleCellClick}
            />
          </div>
          
          <div className="control-section">
            <SimulationController 
              isRunning={isRunning}
              onStart={handleStart}
              onStop={handleStop}
              onStep={handleStep}
              onReset={handleReset}
              onSpeedChange={handleSpeedChange}
              onAgentParamChange={handleAgentParamChange}
              agents={agents}
            />
          </div>
        </div>
        
        <div className="info-section">
          <h2>Learning About RL</h2>
          <InfoPanel />
        </div>
      </main>
      
      <footer className="App-footer">
        <p>Created for educational purposes - evolve.io</p>
      </footer>
    </div>
  );
}

export default App;
