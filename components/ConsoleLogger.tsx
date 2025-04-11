"use client";

import { useEffect } from 'react';

export default function ConsoleLogger() {
  useEffect(() => {
    // Clear console first
    console.clear();
    
    // Print ASCII art and messages
    console.log(`%c
,--. ,--.          ,--.              ,--.                     
|  .'   /  ,--,--. |  ,---.  ,--.--. |  |-.   ,--,--.         
|  .   '  ' ,-.  | |  .-.  | |  .--' | .-. ' ' ,-.  |         
|  |\\   \\ \\ '-'  | |  | |  | |  |    | \`-' | \\ '-'  |         
\`--' '--'  \`--\`--' \`--' \`--' \`--'     \`---'   \`--\`--'         
 `, 
      'color: #4f46e5; font-family: monospace; font-size: 12px; font-weight: bold; text-shadow: 1px 1px 1px rgba(0,0,0,0.2);'
    );
    
    console.log(
      '%cWelcome to Alemdar Teknik! 👋', 
      'color: #4f46e5; font-size: 20px; font-weight: bold; text-shadow: 1px 1px 1px rgba(0,0,0,0.1);'
    );
    
    console.log(
      '%cInterested in how this site works? Contact with us!', 
      'color: #6366f1; font-size: 14px; font-style: italic;'
    );
  }, []);

  return null; // This component doesn't render anything
}