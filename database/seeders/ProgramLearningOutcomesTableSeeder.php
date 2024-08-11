<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProgramLearningOutcomesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $programLearningOutcomes = [
            ['PLO_No' => 'PLO 1', 'PLO_Description' => 'Engineering knowledge: Apply the knowledge of mathematics, science, engineering
            fundamentals and an engineering specialization to the solution of complex engineering
            problems.'],
            ['PLO_No' => 'PLO 2', 'PLO_Description' => 'Problem analysis: Identify, formulate, research the literature and analyze complex
            engineering problems and reach substantiated conclusions using first principles of
            mathematics, the natural sciences and the engineering sciences.'],
            ['PLO_No' => 'PLO 3', 'PLO_Description' => 'Design/development of solutions: Design solutions for complex engineering problems and
            design system components or processes that meet the specified needs with appropriate
            consideration for public health and safety as well as cultural, societal and environmental
            concerns.'],
            ['PLO_No' => 'PLO 4', 'PLO_Description' => 'Investigation: Conduct investigations of complex problems, considering design of
            experiments, analysis and interpretation of data and synthesis of information to provide
            valid conclusions.'],
            ['PLO_No' => 'PLO 5', 'PLO_Description' => 'Modern tool usage: Create, select and apply appropriate techniques, resources and modern
            engineering and IT tools including prediction and modeling to complex engineering
            activities with an understanding of the limitations.'],
            ['PLO_No' => 'PLO 6', 'PLO_Description' => 'The engineer and society: Apply reasoning informed by contextual knowledge to assess
            societal, health, safety, legal and cultural issues and the consequent responsibilities
            relevant to professional engineering practice.'],
            ['PLO_No' => 'PLO 7', 'PLO_Description' => 'Environment and sustainability: Understand the impact of professional engineering
            solutions in societal and environmental contexts and demonstrate the knowledge of, for
            sustainable development.'],
            ['PLO_No' => 'PLO 8', 'PLO_Description' => 'Ethics: Apply ethical principles and commit to professional ethics, responsibilities and the
            norms of the engineering practice.'],
            ['PLO_No' => 'PLO 9', 'PLO_Description' => 'Individual work and teamwork: Function effectively as an individual and as a member or
            leader of diverse teams as well as in multidisciplinary settings.'],
            ['PLO_No' => 'PLO 10', 'PLO_Description' => 'Communication: Communicate effectively about complex engineering activities with the
            engineering community and with society at large. Be able to comprehend and write
            effective reports, design documentation, make effective presentations and give and receive
            clear instructions.'],
            ['PLO_No' => 'PLO 11', 'PLO_Description' => 'Project management and finance: Demonstrate knowledge and understanding of the
            engineering and management principles and apply these to one’s own work as a member
            or a leader of a team to manage projects in multi-disciplinary environments.'],
            ['PLO_No' => 'PLO 12', 'PLO_Description' => 'Life-long learning: Recognize the need for and have the preparation and ability to engage
            in independent, life-long learning in the broadest context of technological change.'],
        ];

        DB::table('program_learning_outcomes')->insert($programLearningOutcomes);
    }
}
