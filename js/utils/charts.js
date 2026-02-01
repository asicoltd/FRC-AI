// Chart utilities
class ChartUtils {
    // Dashboard charts
    static renderDashboardCharts() {
        // Profitability Chart
        const profitabilityCtx = document.getElementById('profitabilityChart')?.getContext('2d');
        if (profitabilityCtx) {
            new Chart(profitabilityCtx, {
                type: 'line',
                data: {
                    labels: ['2021', '2022', '2023'],
                    datasets: [{
                        label: 'ROE (%)',
                        data: [18.2, 15.6, 12.3],
                        borderColor: '#3949ab',
                        backgroundColor: 'rgba(57, 73, 171, 0.1)',
                        tension: 0.3
                    }, {
                        label: 'ROA (%)',
                        data: [9.8, 8.2, 6.5],
                        borderColor: '#ff6f00',
                        backgroundColor: 'rgba(255, 111, 0, 0.1)',
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Profitability Trend'
                        }
                    }
                }
            });
        }

        // Liquidity Chart
        const liquidityCtx = document.getElementById('liquidityChart')?.getContext('2d');
        if (liquidityCtx) {
            new Chart(liquidityCtx, {
                type: 'bar',
                data: {
                    labels: ['2021', '2022', '2023'],
                    datasets: [{
                        label: 'Current Ratio',
                        data: [2.1, 1.8, 1.5],
                        backgroundColor: '#3949ab'
                    }, {
                        label: 'Quick Ratio',
                        data: [1.5, 1.2, 0.9],
                        backgroundColor: '#ff6f00'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Liquidity Ratios'
                        }
                    }
                }
            });
        }
    }
}