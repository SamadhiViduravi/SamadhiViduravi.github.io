"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"

export default function Projects() {
  return (
    <section id="projects" className="projects" data-scroll-section>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" data-scroll data-scroll-speed="1">
            My Projects
          </h2>
          <div className="section-line" data-scroll data-scroll-speed="1.2"></div>
        </div>
        <div className="projects-grid">
          <div className="project-card" data-category="mobile iot" data-scroll data-scroll-speed="1">
            <div className="project-image">
              <Image src="/images/project1.jpeg" alt="Mobile IoT Project" width={600} height={400} />
              <div className="project-overlay">
                <div className="project-category">Mobile & IoT</div>
                <div className="project-links">
                  <Link href="#" target="_blank">
                    <ExternalLink size={16} />
                  </Link>
                  <Link href="#" target="_blank">
                    <Github size={16} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="project-info">
              <h3>Flutter Mobile App with Arduino IoT Integration</h3>
              <p>
                Developed a mobile application using Flutter and Firebase, with a custom Arduino IoT component for
                real-time data monitoring and control.
              </p>
              <div className="project-tech">
                <span>Flutter</span>
                <span>Firebase</span>
                <span>Arduino</span>
                <span>IoT</span>
              </div>
            </div>
          </div>

          <div className="project-card" data-category="web" data-scroll data-scroll-speed="1.2">
            <div className="project-image">
              <Image src="/images/project2.jpg" alt="Web Project" width={600} height={400} />
              <div className="project-overlay">
                <div className="project-category">Web Development</div>
                <div className="project-links">
                  <Link href="#" target="_blank">
                    <ExternalLink size={16} />
                  </Link>
                  <Link href="#" target="_blank">
                    <Github size={16} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="project-info">
              <h3>Personal Portfolio Website</h3>
              <p>
                Designed and developed a responsive personal portfolio website using HTML, CSS, and JavaScript with
                smooth animations and modern design.
              </p>
              <div className="project-tech">
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
                <span>Responsive</span>
              </div>
            </div>
          </div>

          <div className="project-card" data-category="iot" data-scroll data-scroll-speed="1.4">
            <div className="project-image">
              <Image src="/images/project3.jpg" alt="IoT Project" width={600} height={400} />
              <div className="project-overlay">
                <div className="project-category">IoT</div>
                <div className="project-links">
                  <Link href="#" target="_blank">
                    <ExternalLink size={16} />
                  </Link>
                  <Link href="#" target="_blank">
                    <Github size={16} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="project-info">
              <h3>Smart Home Automation System</h3>
              <p>
                Built an Arduino-based smart home system that controls lighting, temperature, and security features
                through a mobile application.
              </p>
              <div className="project-tech">
                <span>Arduino</span>
                <span>IoT</span>
                <span>C++</span>
                <span>Mobile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
