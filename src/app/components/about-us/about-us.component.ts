import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface Milestone {
  year: number;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  teamMembers: TeamMember[] = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
      bio: 'With over 15 years in event planning, Sarah founded Next Event to revolutionize the event rental industry.'
    },
    {
      name: 'Michael Chen',
      role: 'Operations Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
      bio: 'Michael ensures seamless delivery and setup for all our events, maintaining our high standards of service.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
      bio: 'Emily brings creative vision to our inventory selection and helps clients create stunning event spaces.'
    },
    {
      name: 'David Thompson',
      role: 'Customer Relations Manager',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      bio: 'David leads our customer service team, ensuring every client receives exceptional support.'
    }
  ];

  milestones: Milestone[] = [
    {
      year: 2018,
      title: 'Company Founded',
      description: 'NextEvent was established with a vision to transform event rentals.',
      icon: 'foundation'
    },
    {
      year: 2019,
      title: 'Expanded Inventory',
      description: 'Added premium furniture and decor collections to our inventory.',
      icon: 'inventory_2'
    },
    {
      year: 2020,
      title: 'Digital Innovation',
      description: 'Launched our online booking platform for seamless rentals.',
      icon: 'computer'
    },
    {
      year: 2021,
      title: 'Regional Expansion',
      description: 'Expanded services to cover the entire metropolitan area.',
      icon: 'location_on'
    },
    {
      year: 2022,
      title: 'Sustainability Initiative',
      description: 'Implemented eco-friendly practices across operations.',
      icon: 'eco'
    }
  ];

  values = [
    {
      icon: 'diamond',
      title: 'Premium Quality',
      description: 'We maintain the highest standards in our rental inventory.'
    },
    {
      icon: 'handshake',
      title: 'Customer First',
      description: 'Your satisfaction is our top priority in everything we do.'
    },
    {
      icon: 'eco',
      title: 'Sustainability',
      description: 'Committed to environmentally responsible practices.'
    },
    {
      icon: 'diversity_3',
      title: 'Community',
      description: 'Supporting and growing with our local community.'
    }
  ];

  constructor(private router: Router) {}

  navigateToOrder() {
    this.router.navigate(['/orders/new']);
  }
}