const { PrismaClient } = require('@prisma/client');
const bcryptjs = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcryptjs.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@ghawdex.com' },
    update: {},
    create: {
      email: 'admin@ghawdex.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
      department: 'Management',
      active: true,
    },
  });

  console.log(`✅ Created admin user: ${admin.email}`);

  // Create sample company info
  await prisma.companyInfo.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      mission: 'To revolutionize solar energy installation with industry-leading technology and service.',
      vision: 'To become the most trusted solar energy partner in Malta.',
      values: `Innovation - We embrace new technologies and ideas
Integrity - We operate with honesty and transparency
Excellence - We deliver quality in everything we do
Sustainability - We are committed to environmental responsibility
Teamwork - We succeed through collaboration and mutual support`,
    },
  });

  console.log('✅ Created company information');

  // Create sample team members
  await prisma.teamMember.create({
    data: {
      name: 'John Smith',
      title: 'Engineering Manager',
      department: 'Engineering',
      email: 'john.smith@ghawdex.com',
      phone: '+356 2234 5678',
      bio: 'Experienced engineering manager with 10+ years in solar energy.',
    },
  });

  await prisma.teamMember.create({
    data: {
      name: 'Maria Garcia',
      title: 'Project Lead',
      department: 'Engineering',
      email: 'maria.garcia@ghawdex.com',
      phone: '+356 9912 3456',
      bio: 'Project lead specializing in residential solar installations.',
    },
  });

  console.log('✅ Created sample team members');

  // Create sample policies
  await prisma.policy.create({
    data: {
      title: 'Code of Conduct',
      category: 'Employee Manual',
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

  console.log('✅ Created sample policies');

  // Create sample goals
  await prisma.goal.create({
    data: {
      title: 'Increase Installation Capacity',
      description: 'Expand installation team to handle 20% more projects',
      period: 'yearly',
      department: 'Engineering',
      owner: 'John Smith',
      progress: 45,
    },
  });

  console.log('✅ Created sample goals');

  // Create sample procedures
  await prisma.procedure.create({
    data: {
      title: 'Emergency Evacuation',
      category: 'emergency',
      content: `1. Alert all personnel
2. Exit via nearest stairwell
3. Assemble at designated meeting point
4. Account for all personnel
5. Do not return until all-clear given`,
      priority: 'critical',
    },
  });

  console.log('✅ Created sample procedures');

  // Create sample tools
  await prisma.tool.create({
    data: {
      name: 'Slack',
      description: 'Team communication and messaging platform',
      category: 'Communication',
      url: 'https://slack.com',
    },
  });

  console.log('✅ Created sample tools');

  // Create sample wiki pages
  await prisma.wikiPage.upsert({
    where: { slug: 'getting-started-solar-installation' },
    update: {},
    create: {
      title: 'Getting Started with Solar Installation',
      slug: 'getting-started-solar-installation',
      category: 'Engineering',
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
      author: 'Engineering Team',
      published: true,
    },
  });

  console.log('✅ Created sample wiki pages');

  // Create sample calendar events
  const now = new Date();
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const nextQuarter = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

  await prisma.calendarEvent.upsert({
    where: { id: 'event-1' },
    update: {},
    create: {
      id: 'event-1',
      title: 'Team Standup Meeting',
      description: 'Daily team synchronization and progress updates',
      type: 'meeting',
      startDate: nextWeek,
      endDate: new Date(nextWeek.getTime() + 1 * 60 * 60 * 1000),
    },
  });

  await prisma.calendarEvent.upsert({
    where: { id: 'event-2' },
    update: {},
    create: {
      id: 'event-2',
      title: 'Q1 Project Deadline',
      description: 'Final submission deadline for Q1 deliverables',
      type: 'deadline',
      startDate: nextMonth,
      endDate: nextMonth,
    },
  });

  await prisma.calendarEvent.upsert({
    where: { id: 'event-3' },
    update: {},
    create: {
      id: 'event-3',
      title: 'Company All-Hands Meeting',
      description: 'Quarterly business review and strategy session',
      type: 'meeting',
      startDate: nextQuarter,
      endDate: new Date(nextQuarter.getTime() + 2 * 60 * 60 * 1000),
    },
  });

  console.log('✅ Created sample calendar events');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
