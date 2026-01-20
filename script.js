// Populate dropdowns when page loads
document.addEventListener('DOMContentLoaded', () => {
    const roundSelect = document.getElementById('round');
    const pickSelect = document.getElementById('pick');

    // Round dropdown: "Round 1" to "Round 7"
    for (let r = 1; r <= 7; r++) {
        const option = document.createElement('option');
        option.value = r;
        option.textContent = `Round ${r}`;
        roundSelect.appendChild(option);
    }

    // Pick dropdown: 1 to 32
    for (let p = 1; p <= 32; p++) {
        const option = document.createElement('option');
        option.value = p;
        option.textContent = p;
        pickSelect.appendChild(option);
    }

    // Press Enter in overall box → convert
    document.getElementById('overall').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            convertPick();
        }
    });
});

function convertPick() {
    const overallInput = document.getElementById('overall').value.trim();
    const roundValue   = document.getElementById('round').value;
    const pickValue    = document.getElementById('pick').value;
    const output       = document.getElementById('output');

    output.innerHTML = ''; // Clear previous result

    const picksPerRound = 32;
    const totalRounds   = 7;
    const totalPicks    = picksPerRound * totalRounds; // 224

    let round, pick, overall;

    if (overallInput !== '' && !isNaN(overallInput)) {
        overall = parseInt(overallInput);
        if (overall < 1 || overall > totalPicks) {
            output.innerHTML = '<p class="error">Overall pick must be 1–224.</p>';
            return;
        }
        round = Math.ceil(overall / picksPerRound);
        pick  = overall - ((round - 1) * picksPerRound);
    }
    else if (roundValue !== '' && pickValue !== '') {
        round = parseInt(roundValue);
        pick  = parseInt(pickValue);
        overall = ((round - 1) * picksPerRound) + pick;
    }
    else {
        output.innerHTML = '<p class="error">Enter an overall pick or select both round and pick.</p>';
        return;
    }

    output.innerHTML = `
        <p><strong>Overall Pick:</strong> ${overall}</p>
        <p><strong>Round/Pick:</strong> Round ${round} Pick ${pick}</p>
    `;
}

// NEW: Clear everything
function clearAll() {
    document.getElementById('overall').value = '';
    document.getElementById('round').value = '';
    document.getElementById('pick').value = '';
    document.getElementById('output').innerHTML = '';
}