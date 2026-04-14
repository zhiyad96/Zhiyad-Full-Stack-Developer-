import AboutSection from '@/component/About'
import ContactSection from '@/component/conatct'
import GameSection from '@/component/game'
import ModernHero from '@/component/Hero'
import ProjectSection from '@/component/project'
import SkillSection from '@/component/skill'
import ExperienceSection from '@/component/workexperiance'
import React from 'react'

function page() {
  return (
    <>
    <ModernHero/>
    <SkillSection/>
    <AboutSection/>
    <ProjectSection/>
    <ExperienceSection/>
    <GameSection/>
    <ContactSection/>


    </>
  )
}

export default page