# Evolve.io

A civilization builder educational game where players directly influence the reinforcement learning (RL) algorithms and policies learned by agents.

## Overview

Evolve.io creates a sandbox environment where players can:
- Watch agents learn through reinforcement learning algorithms
- Directly adjust RL parameters and influence learning
- Understand the impact of different policies and learning approaches
- See visualizations of learning progress in real-time

## Key Features

- Interactive grid-based world with resources
- Multiple agents using Q-learning to make decisions
- Educational information about RL concepts
- Real-time control over learning parameters:
  - Learning rate
  - Exploration rate
  - Discount factor

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/evolve.io.git
   cd evolve.io
   ```

2. Install dependencies:
   ```
   cd ui
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser to `http://localhost:3000`

## How It Works

The simulation is based on:
- Agents: The decision-makers that interact with the environment
- Environment: The grid world with resources
- Q-learning: The algorithm agents use to learn optimal policies
- Rewards: Collected when agents find resources

Players can:
- Adjust learning parameters in real-time
- Watch how these adjustments affect agent behavior
- Learn about reinforcement learning concepts through the InfoPanel

## Future Plans

- More sophisticated agents with different learning algorithms
- Larger environment with varied terrain
- Agent evolution and specialization
- Multiplayer mode where players can compete/collaborate
- Advanced visualization of Q-tables and learning progress

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.