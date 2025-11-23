import { prisma } from "../lib/prisma";
import bcryptjs from "bcryptjs";

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const hashedPassword = await bcryptjs.hash("password123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@ghawdex.com" },
    update: {},
    create: {
      email: "admin@ghawdex.com",
      password: hashedPassword,
      name: "Admin User",
      role: "ADMIN",
      department: "Management",
      active: true,
    },
  });

  console.log(`✅ Created admin user: ${admin.email}`);

  // Create sample company info
  const company = await prisma.companyInfo.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      mission: "To revolutionize solar energy installation with industry-leading technology and service.",
      vision: "To become the most trusted solar energy partner in Malta.",
      values: `Innovation - We embrace new technologies and ideas
Integrity - We operate with honesty and transparency
Excellence - We deliver quality in everything we do
Sustainability - We are committed to environmental responsibility
Teamwork - We succeed through collaboration and mutual support`,
    },
  });

  console.log("✅ Created company information");

  // Create sample announcements
  await prisma.announcement.create({
    data: {
      title: "Welcome to GhawdeX Portal",
      content: "Welcome to the new GhawdeX Engineering employee portal! This is your hub for company information, policies, and project documentation.",
      author: "HR Team",
      priority: "high",
    },
  });

  console.log("✅ Created sample announcement");

  // Create sample team members
  await prisma.teamMember.create({
    data: {
      name: "John Smith",
      title: "Engineering Manager",
      department: "Engineering",
      email: "john.smith@ghawdex.com",
      phone: "+356 2234 5678",
      bio: "Experienced engineering manager with 10+ years in solar energy.",
    },
  });

  await prisma.teamMember.create({
    data: {
      name: "Maria Garcia",
      title: "Project Lead",
      department: "Engineering",
      email: "maria.garcia@ghawdex.com",
      phone: "+356 9912 3456",
      bio: "Project lead specializing in residential solar installations.",
    },
  });

  await prisma.teamMember.create({
    data: {
      name: "Robert Wilson",
      title: "Sales Manager",
      department: "Sales",
      email: "robert.wilson@ghawdex.com",
      phone: "+356 9934 5678",
      bio: "Sales manager with a track record of exceeding targets.",
    },
  });

  console.log("✅ Created sample team members");

  // Create sample policies
  await prisma.policy.create({
    data: {
      title: "Code of Conduct",
      category: "Employee Manual",
      content: `1. Professional Behavior
Maintain professional conduct at all times in the workplace.

2. Respectful Communication
Treat all colleagues with respect and professionalism.

3. Safety First
Always follow safety protocols and procedures.

4. Confidentiality
Protect company and client confidential information.

5. Punctuality
Arrive on time for work and meetings.`,
      version: 1,
    },
  });

  await prisma.policy.create({
    data: {
      title: "Vacation Policy",
      category: "Vacation Policy",
      content: `Vacation Entitlement:
- Employees receive 20 days of annual vacation
- Requests must be submitted 30 days in advance
- Vacation days cannot be carried over to the next year
- Accrued vacation is paid out upon termination`,
      version: 1,
    },
  });

  console.log("✅ Created sample policies");

  // Create sample goals
  await prisma.goal.create({
    data: {
      title: "Increase Installation Capacity",
      description: "Expand installation team to handle 20% more projects",
      period: "yearly",
      department: "Engineering",
      owner: "John Smith",
      progress: 45,
    },
  });

  await prisma.goal.create({
    data: {
      title: "Improve Customer Satisfaction",
      description: "Achieve 95% customer satisfaction rating",
      period: "quarterly",
      department: "Sales",
      owner: "Robert Wilson",
      progress: 78,
    },
  });

  console.log("✅ Created sample goals");

  // Create sample procedures
  await prisma.procedure.create({
    data: {
      title: "Emergency Evacuation",
      category: "emergency",
      content: `1. Alert all personnel
2. Exit via nearest stairwell
3. Assemble at designated meeting point
4. Account for all personnel
5. Do not return until all-clear given`,
      priority: "critical",
    },
  });

  await prisma.procedure.create({
    data: {
      title: "Installation Workflow",
      category: "best-practices",
      content: `1. Site Survey - Assess location and requirements
2. Design - Create system design and propose timeline
3. Permitting - Obtain necessary approvals
4. Installation - Install panels and inverter
5. Testing - Verify system functionality
6. Commissioning - Hand over to customer`,
      priority: "high",
    },
  });

  console.log("✅ Created sample procedures");

  // Create sample tools
  await prisma.tool.create({
    data: {
      name: "Slack",
      description: "Team communication and messaging platform",
      category: "Communication",
      url: "https://slack.com",
    },
  });

  await prisma.tool.create({
    data: {
      name: "GitHub",
      description: "Version control and project management",
      category: "Development",
      url: "https://github.com",
    },
  });

  await prisma.tool.create({
    data: {
      name: "Figma",
      description: "Design and prototyping tool",
      category: "Design",
      url: "https://figma.com",
    },
  });

  console.log("✅ Created sample tools");

  // Create sample wiki pages
  await prisma.wikiPage.create({
    data: {
      title: "Getting Started with Solar Installation",
      slug: "getting-started-solar-installation",
      category: "Engineering",
      content: `# Getting Started with Solar Installation

## Overview
This guide covers the basics of solar panel installation.

## Safety First
Always wear appropriate PPE and follow safety protocols.

## Tools Required
- Drill
- Saw
- Level
- Mounting hardware
- Testing equipment

## Installation Steps
1. Prepare the roof
2. Install mounting system
3. Mount panels
4. Connect wiring
5. Install inverter
6. Test system`,
      author: "Engineering Team",
      published: true,
    },
  });

  await prisma.wikiPage.create({
    data: {
      title: "System Design Guidelines",
      slug: "system-design-guidelines",
      category: "Engineering",
      content: `# System Design Guidelines

## Sizing
- 1kW per 6-8 m² of panel area
- Account for shading and orientation

## Inverter Selection
- Choose based on system size
- Ensure compatibility with panels

## Wiring
- Use appropriate cable gauge
- Follow electrical codes`,
      author: "Engineering Team",
      published: true,
    },
  });

  console.log("✅ Created sample wiki pages");

  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
