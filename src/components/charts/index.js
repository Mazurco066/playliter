// Dependencies
import Chart from 'chart.js'

// Transaction charts
export const transactionChart = {
  /**
   * Creates a transaction chart grouped by day
   * @param {string} chartId 
   * @param {Array} chartData 
   */
  createChartByDay(chartId, chartData) {

    // Compute chart data
    const labels = chartData.map(({ _id }) => _id.split('-').reverse().join('/'))
    const displayData = chartData.map(({ count }) => count)

    // Chart layout variables
    const chartColor = '#FFFFFF'
    const fallBackColor = '#1C8781'
    const color = this.color || fallBackColor
    const ctx = document.getElementById(chartId).getContext('2d')
    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0)
    gradientStroke.addColorStop(0, color)
    gradientStroke.addColorStop(1, chartColor)

    // Create chart instance
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Transações realizadas',
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            backgroundColor: '#1C8781',
            data: displayData,
            maxBarThickness: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: true,
          mode: 'index',
          intersect: false,
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                drawBorder: false,
                drawTicks: false,
                lineWidth: 0,
                zeroLineWidth: 0,
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
              ticks: {
                beginAtZero: true,
                padding: 10,
                fontSize: 13,
                fontColor: '#8898aa',
                fontFamily: 'Manrope',
                callback: function (value) {
                  if (!(value % 10)) {
                    return value
                  }
                },
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
                drawOnChartArea: false,
                drawTicks: false,
              },
              ticks: {
                padding: 20,
                fontSize: 13,
                fontColor: '#8898aa',
                fontFamily: 'Manrope',
              },
            },
          ],
        },
      },
    })
  },
  /**
   * Creates a transaction chart grouped by month
   * @param {string} chartId 
   * @param {Array} chartData 
   */
  createChartByMonth(chartId, chartData) {

    // Compute chart data
    const labels = chartData.map(({ _id }) => _id)
    const displayData = chartData.map(({ count }) => count)

    // Chart layout variables
    const chartColor = '#FFFFFF'
    const fallBackColor = '#1C8781'
    const color = this.color || fallBackColor
    const ctx = document.getElementById(chartId).getContext('2d')
    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0)
    gradientStroke.addColorStop(0, color)
    gradientStroke.addColorStop(1, chartColor)

    // Create chart instance
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Transações realizadas',
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            backgroundColor: '#1C8781',
            data: displayData,
            maxBarThickness: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: true,
          mode: 'index',
          intersect: false,
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                drawBorder: false,
                drawTicks: false,
                lineWidth: 0,
                zeroLineWidth: 0,
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
              ticks: {
                beginAtZero: true,
                padding: 10,
                fontSize: 13,
                fontColor: '#8898aa',
                fontFamily: 'Manrope',
                callback: function (value) {
                  if (!(value % 10)) {
                    return value
                  }
                },
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
                drawOnChartArea: false,
                drawTicks: false,
              },
              ticks: {
                padding: 20,
                fontSize: 13,
                fontColor: '#8898aa',
                fontFamily: 'Manrope',
              },
            },
          ],
        },
      },
    })
  }
}

// Graph funcs
const funcs = {
  transactionChart() {}
}

// Exporting funcs
export default funcs
