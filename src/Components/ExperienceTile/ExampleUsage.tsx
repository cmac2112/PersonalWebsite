import React from 'react';
import ExperienceTile from '../ExperienceTile/ExperienceTile';

const ExampleUsage: React.FC = () => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', padding: '2rem' }}>
            
            {/* Example 1: Software Engineering Experience */}
            <ExperienceTile
                title="Full Stack Developer"
                subtitle="TechCorp Solutions • 2022-2024"
                technologies={['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS']}
            >
                <h4>Key Responsibilities:</h4>
                <ul>
                    <li>Built and maintained scalable web applications serving 10,000+ daily users</li>
                    <li>Implemented responsive UI components using React and TypeScript</li>
                    <li>Designed RESTful APIs and database schemas</li>
                    <li>Collaborated with cross-functional teams in Agile environment</li>
                </ul>
                
                <h4>Notable Achievements:</h4>
                <ul>
                    <li>Reduced application load time by 40% through optimization</li>
                    <li>Led migration from JavaScript to TypeScript, improving code reliability</li>
                    <li>Mentored 3 junior developers on best practices</li>
                </ul>
            </ExperienceTile>

            {/* Example 2: Project Experience */}
            <ExperienceTile
                title="Personal Portfolio Website"
                subtitle="Side Project • 2024"
                technologies={['React', 'Vite', 'CSS3', 'TypeScript']}
            >
                <p>
                    A fully responsive personal portfolio showcasing my development skills 
                    and projects. Features smooth animations, interactive components, and 
                    a modern design system.
                </p>
                
                <h4>Features:</h4>
                <ul>
                    <li>Animated welcome sequence with gradient backgrounds</li>
                    <li>Responsive design for all device sizes</li>
                    <li>Interactive experience tiles (like this one!)</li>
                    <li>Clean, modern UI with smooth transitions</li>
                </ul>
                
                <h4>Technical Highlights:</h4>
                <ul>
                    <li>Custom CSS animations and transitions</li>
                    <li>Component-based architecture</li>
                    <li>TypeScript for type safety</li>
                    <li>Mobile-first responsive design</li>
                </ul>
            </ExperienceTile>

            {/* Example 3: Education */}
            <ExperienceTile
                title="Computer Science Degree"
                subtitle="Bethel College • 2021-2025"
                technologies={['Java', 'Python', 'C++', 'SQL', 'Git', 'Algorithms']}
            >
                <h4>Relevant Coursework:</h4>
                <ul>
                    <li>Data Structures and Algorithms</li>
                    <li>Database Management Systems</li>
                    <li>Software Engineering Principles</li>
                    <li>Web Development</li>
                    <li>Computer Graphics</li>
                </ul>
                
                <h4>Leadership:</h4>
                <ul>
                    <li>Founded the first Software Development Club at Bethel College</li>
                    <li>Organized hackathons and coding competitions</li>
                    <li>Led team projects and presentations</li>
                </ul>
                
                <h4>Awards:</h4>
                <ul>
                    <li>Dean's List for Academic Excellence</li>
                    <li>Best Up and Coming Club Award</li>
                    <li>NASA USRP Internship Recipient</li>
                </ul>
            </ExperienceTile>

            {/* Example 4: Simple Content */}
            <ExperienceTile
                title="Chess Bot Project"
                subtitle="Personal Project • 2023"
                technologies={['Python', 'AI/ML', 'Game Theory']}
            >
                <p>
                    Developed an intelligent chess-playing bot using minimax algorithm 
                    with alpha-beta pruning. The bot can analyze positions and make 
                    strategic decisions at different difficulty levels.
                </p>
                
                <p>
                    Try playing against my chess bot on this website! It's challenging 
                    but fair, and a great way to improve your chess skills.
                </p>
            </ExperienceTile>

        </div>
    );
};

export default ExampleUsage;
