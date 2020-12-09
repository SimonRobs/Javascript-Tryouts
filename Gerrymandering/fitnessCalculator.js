class FitnessCalculator {
    static calculateFitness(district) {
        // Calculate the fitness of the district
        // https://arxiv.org/pdf/1808.02826.pdf (Page 21)
        // Calculate the vote threshold
        district.calculateVoteThreshold(N_DISTRICTS);
        // For each district, calculate the number of precincts that the party can win
        let districtsNotWon = 0;
        let districtsWon = 0;
        for (let d of districts) {
            districtsNotWon += heaviside(d.nGreenVotes);
            districtsWon += heaviside(d.nGreenVotes - district.voteThreshold);
        }
        let contendedDistricts = districtsNotWon - districtsWon;

        let winnableDistricts = 0;
        for (let d of districts) {
            winnableDistricts += heaviside(d.nGreenVotes - district.voteThreshold) + contendedDistricts / 2;
        }
        return winnableDistricts / N_DISTRICTS;
    }
}