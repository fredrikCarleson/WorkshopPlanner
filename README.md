# WorkshopPlanner

A modern web application for designing and planning workshops using Liberating Structures methodology. Built with React, TypeScript, and Tailwind CSS.

## 🎯 Overview

WorkshopPlanner helps facilitators, trainers, and team leaders create well-structured workshops by automatically generating workshop schedules based on Liberating Structures. The application takes into account workshop duration, number of participants, and specific purposes to recommend appropriate facilitation techniques and create a comprehensive workshop plan.

## ✨ Features

- **Smart Workshop Generation**: Automatically creates workshop schedules based on your inputs
- **Liberating Structures Integration**: Built-in library of facilitation techniques and structures
- **Purpose-Driven Design**: Choose from 15 different workshop purposes to guide structure selection
- **Flexible Configuration**: Customize duration, participant count, and workshop goals
- **PDF Export**: Generate and download workshop schedules as PDF documents
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Local Storage**: Saves your workshop data automatically
- **Real-time Preview**: See your workshop schedule as you build it

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd WorkshopPlanner
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📖 Usage

### Creating a Workshop

1. **Set Basic Parameters**:
   - Enter workshop duration (in hours)
   - Specify number of participants
   - Add workshop context and goals

2. **Select Purposes**:
   - Choose from 15 different workshop purposes
   - Each purpose has specific Liberating Structures recommendations
   - You can select multiple purposes for complex workshops

3. **Generate Workshop**:
   - Click "Generate Workshop" to create your schedule
   - The system will automatically select appropriate structures
   - Timing is calculated based on participant count and structure requirements

4. **Review and Customize**:
   - Review the generated workshop schedule
   - Each session includes timing, purpose, and transition notes
   - Use "Regenerate" to create alternative schedules

5. **Export**:
   - Download your workshop as a PDF for printing or sharing

### Workshop Purposes

The application supports 15 different workshop purposes:

- **Articulate Challenge**: Define and understand the challenge at hand
- **Reveal Assumptions**: Uncover hidden assumptions and mental models
- **Spark Innovation**: Stimulate creative thinking and new solutions
- **Generate Ideas**: Create many new ideas from the whole group
- **Build Understanding**: Develop deeper understanding of complex issues
- **Share Knowledge**: Spread knowledge, experiences, and best practices
- **Make Decisions**: Reach concrete decisions and action plans
- **Develop Strategies**: Create long-term strategies and future plans
- **Build Connections**: Strengthen relationships and improve collaboration
- **Learn from Experience**: Reflect on and learn from previous experiences
- **Plan Implementation**: Develop concrete plans for implementation
- **Engage Stakeholders**: Involve and engage important stakeholders
- **Foster Inclusion**: Ensure all voices are heard and diversity is valued
- **Adapt to Change**: Develop ability to handle and adapt to change
- **Evaluate Options**: Systematically evaluate and compare alternatives

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── PurposeSelector.tsx
│   ├── StructureCard.tsx
│   ├── StructureLibrary.tsx
│   ├── WorkshopForm.tsx
│   └── WorkshopSchedule.tsx
├── data/               # Static data and configurations
│   ├── liberatingStructures.ts
│   └── purposes.ts
├── types/              # TypeScript type definitions
│   └── Workshop.ts
├── utils/              # Utility functions
│   └── workshopCalculator.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **PDF Generation**: jsPDF with html2canvas
- **Icons**: Lucide React
- **Code Quality**: ESLint with TypeScript support

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Liberating Structures

This application is built around the Liberating Structures methodology, which provides 33+ facilitation techniques that can be combined in countless ways to create engaging and effective workshops. Each structure is designed to:

- Include and engage everyone
- Distribute control and responsibility
- Practice deep respect for people and local solutions
- Build trust as you go
- Learn by failing forward

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Based on [Liberating Structures](https://www.liberatingstructures.com) methodology
- Built with modern web technologies for optimal user experience
- Designed to make workshop planning accessible and effective

## 📞 Support

For questions, issues, or feature requests, please open an issue in the repository or contact the development team.

---

**Happy Workshop Planning!** 🎉
