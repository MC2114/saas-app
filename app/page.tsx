import React from 'react'
import {Button} from "@/components/ui/button";
import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import Cta from "@/components/CTA";
import "./globals.css"
import {recentSessions} from "@/constants";
import {getAllCompanions, getRecentSessions} from "@/lib/actions/companion.actions";
import {getSubjectColor} from "@/lib/utils";

const Page = async () => {
  const companions = await getAllCompanions({limit : 3});
  const recentSessionsCompanions = await getRecentSessions(10);

    return (
      <main>
          <h1 className="text-2xl">Popular Companions</h1>
            <section className="home-section">
                {/*<CompanionCard*/}
                {/*    id = "123"*/}
                {/*    name = "Neural Networks: An Introduction"*/}
                {/*    topic= "Machine Learning"*/}
                {/*    subject="computer science"*/}
                {/*    duration={30}*/}
                {/*    color="#ffda6e"*/}
                {/*/>*/}
                {/*<CompanionCard*/}
                {/*    id = "456"*/}
                {/*    name = "Countsy the Number Wizard"*/}
                {/*    topic= "Derivatives & Integrals"*/}
                {/*    subject="math"*/}
                {/*    duration={30}*/}
                {/*    color="#e5d0ff"*/}
                {/*/>*/}
                {/*<CompanionCard*/}
                {/*    id = "789"*/}
                {/*    name = "Tokenization and Vedtorization of Words"*/}
                {/*    topic= "Natural Language Processing"*/}
                {/*    subject="linguistics"*/}
                {/*    duration={30}*/}
                {/*    color="#e5d0ff"*/}
                {/*/>*/}
                {companions.map((companion) => (
                    <CompanionCard
                        key={companion.id}
                        {...companion}
                        color={getSubjectColor(companion.subject)}
                    />
                ))}

            </section>

          <section className="home-section">
              <CompanionList
                title="Recently Completed Sessions"
                companions={recentSessionsCompanions}
                classNames="w-2/3 max-ldg:w-full"
              />
              <Cta  />
          </section>
      </main>
  )
}

export default Page