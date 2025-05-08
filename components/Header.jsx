import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import React from "react";

import NexGenAiLogo from "@/components/NexGenAiLogo";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, FileText, GraduationCap, LayoutDashboardIcon, PenBox, StarIcon, StarsIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";

export default function Header() {
  return (
<header className="container mx-auto flex items-center justify-between py-4">
    <nav>
    <NexGenAiLogo/>
        </nav>
        <SignedIn>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <LayoutDashboardIcon className="w-4 h-4 mr-2" />
              <span className="hidden md:block">Industry Insights</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button>
                  <StarsIcon className="w-4 h-4 mr-1" />
                  <span className="hidden md:block">AI Tools</span> 
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/ai-tools" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Resume Builder
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/ai-tools" className="flex items-center gap-2">
                    <PenBox className="w-4 h-4" />
                    Cover Letter
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Interview Prep
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <UserButton 
            className="ml-10 h-10 w-10" 
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
                userButtonPopoverCard: "shadow-xl",
                userPreviewMainIdentifier: "font-semibold",
              }
            }} 
          />
        </SignedIn>
  
    <SignedOut>
      <div className="flex items-center gap-2">
        <SignInButton mode="modal">
          <Button variant="outline">Sign In</Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button variant="default">Sign Up</Button>
        </SignUpButton>
      </div>
    </SignedOut>
            

  </header>
)}


