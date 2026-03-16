import { NextResponse } from "next/server";

const PORTFOLIO_CONTEXT = `
# Profile
Name: Bhargavi Shahasane
Role: React & Next.js Developer

Core strengths:
- React.js, Next.js
- Responsive UI, animations, performance
- State management, clean maintainable code
- Real-world CRUD workflows and dashboards

# Experience

## The Salt Inc. — Software Engineer (Nov 2023 – Mar 2024)
- Migrated client sites from WordPress to responsive HTML/CSS with smooth animations
- Built feature-rich interfaces using React.js and Next.js (UX + performance)
- Ensured pixel-perfect design, mobile responsiveness, fast loading

## Coherent Global — Frontend Software Engineer (Sep 2022 – Jul 2023)
- Built scalable UI components using React.js, Next.js, Redux for enterprise apps
- Agile sprints, code reviews, standups
- Collaborated with designers + backend for integration

## Parimity Solutions — Associate Software Engineer (Jan 2021 – Aug 2022)
- UI modules using HTML, CSS, Bootstrap, jQuery, AJAX
- Integrated Python APIs, fixed 500+ bugs across 5+ modules
- Contributed to React.js projects with reusable components and dynamic UI

# Projects

## Restaurant POS System
Problem: Manual order tracking creates billing confusion and no real-time status.
Solution: Full-stack POS app for orders, tables, menu items, billing and role-based authentication.
Tech: Next.js (App Router), Node.js, MongoDB, Redux-Thunk, deployed on Vercel.
Skills demonstrated: CRUD (orders/menu/users), complex UI forms + state management, API integration + data modeling.

## Order & Production Management System
Problem: Manual production tracking causes mismatched stock and delays.
Solution: Order + production system with modal-based editing, centralized production queue (pending/completed), dashboards with charts.
Tech: Next.js, MongoDB, React-Bootstrap, charts.
Skills demonstrated: Consistency across order edits, dashboard UX for business insights, feature modularization.
`;

export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          {
            role: "system",
            content: `You are a Recruiter AI assistant for Bhargavi Shahasane's portfolio. Answer questions using ONLY the info below. Be concise and professional.\n\n${PORTFOLIO_CONTEXT}`,
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();
    console.log("OpenRouter response:", JSON.stringify(data));

    const answer =
      data.choices?.[0]?.message?.content ??
      "Sorry, I couldn't generate a response.";

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("OpenRouter API error:", error);
    return NextResponse.json(
      { answer: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}