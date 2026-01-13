
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import type { ChartOptions, ChartData } from 'chart.js'
import { Line, Bar, Chart, Pie, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']

const data = {
  labels,
  datasets: [
    {
      label: 'Revenue ($k)',
      data: [12, 19, 15, 22, 30, 28, 35],
      borderColor: 'rgb(13, 110, 253)',
      backgroundColor: 'rgba(13, 110, 253, 0.3)',
      tension: 0.35,
      pointRadius: 4,
    },
    {
      label: 'Costs ($k)',
      data: [8, 10, 12, 14, 16, 18, 20],
      borderColor: 'rgb(220, 53, 69)',
      backgroundColor: 'rgba(220, 53, 69, 0.2)',
      tension: 0.35,
      pointRadius: 4,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Performance Over Time',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value: number | string) => `$${value}k`,
      },
    },
  },
}

const barData = {
  labels,
  datasets: [
    {
      label: 'Signups',
      data: [120, 140, 180, 160, 200, 230, 250],
      backgroundColor: 'rgba(25, 135, 84, 0.7)',
      borderColor: 'rgb(25, 135, 84)',
      borderWidth: 1,
    },
    {
      label: 'Cancellations',
      data: [30, 35, 28, 40, 32, 30, 26],
      backgroundColor: 'rgba(255, 193, 7, 0.7)',
      borderColor: 'rgb(255, 193, 7)',
      borderWidth: 1,
    },
  ],
}

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Signups vs Cancellations',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}

const stackedBarData = {
  labels,
  datasets: [
    {
      label: 'North',
      data: [40, 45, 50, 60, 65, 70, 75],
      backgroundColor: 'rgba(13, 110, 253, 0.7)',
    },
    {
      label: 'South',
      data: [25, 30, 28, 32, 38, 40, 42],
      backgroundColor: 'rgba(25, 135, 84, 0.7)',
    },
    {
      label: 'East',
      data: [20, 18, 24, 22, 26, 28, 30],
      backgroundColor: 'rgba(255, 193, 7, 0.7)',
    },
    {
      label: 'West',
      data: [15, 12, 14, 16, 18, 20, 22],
      backgroundColor: 'rgba(220, 53, 69, 0.7)',
    },
  ],
}

const stackedBarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Stacked Revenue by Region',
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      beginAtZero: true,
    },
  },
}

const comboData: ChartData<'bar' | 'line'> = {
  labels,
  datasets: [
    {
      type: 'bar' as const,
      label: 'Units Sold',
      data: [300, 320, 280, 350, 400, 420, 460],
      backgroundColor: 'rgba(13, 110, 253, 0.7)',
      borderColor: 'rgb(13, 110, 253)',
      borderWidth: 1,
    },
    // {
    //   type: 'bar' as const,
    //   label: 'Returns',
    //   data: [20, 25, 18, 22, 24, 28, 26],
    //   backgroundColor: 'rgba(220, 53, 69, 0.6)',
    //   borderColor: 'rgb(220, 53, 69)',
    //   borderWidth: 1,
    // },
    {
      type: 'line' as const,
      label: 'Net Revenue ($k)',
      data: [95, 110, 105, 130, 150, 165, 180],
      borderColor: 'rgb(25, 135, 84)',
      backgroundColor: 'rgba(25, 135, 84, 0.4)',
      tension: 0.3,
      yAxisID: 'y1',
      pointRadius: 4,
    },
  ],
}

const comboOptions: ChartOptions<'bar' | 'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Sales vs Net Revenue',
    },
  },
  scales: {
    x: {
      stacked: false,
    },
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      beginAtZero: true,
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      beginAtZero: true,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
}

const pieData = {
  labels: ['Desktop', 'Mobile', 'Tablet', 'Smart TV'],
  datasets: [
    {
      data: [45, 35, 15, 5],
      backgroundColor: [
        'rgba(13, 110, 253, 0.7)',
        'rgba(25, 135, 84, 0.7)',
        'rgba(255, 193, 7, 0.7)',
        'rgba(220, 53, 69, 0.7)',
      ],
      borderColor: [
        'rgb(13, 110, 253)',
        'rgb(25, 135, 84)',
        'rgb(255, 193, 7)',
        'rgb(220, 53, 69)',
      ],
      borderWidth: 1,
    },
  ],
}

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: true,
      text: 'Traffic Sources',
    },
  },
}

const progressData = {
  datasets: [
    {
      data: [60, 40],
      backgroundColor: [
        'rgba(25, 135, 84, 0.8)',
        'rgba(233, 236, 239, 0.5)',
      ],
      borderColor: [
        'rgb(25, 135, 84)',
        'rgba(233, 236, 239, 0.8)',
      ],
      borderWidth: 1,
      cutout: '70%',
    },
  ],
}

const progressOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Task Completion Progress',
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          return context.label || (context.dataIndex === 0 ? 'Completed: 60%' : 'Remaining: 40%');
        }
      }
    }
  },
}

export function DataVisualisation() {
  return (
    <div className='container'>
      <div className="row">
        <div className="col-lg-6 p-3" style={{ minHeight: 360 }}>
          <Line options={options} data={data} />
        </div>
        <div className="col-lg-6 p-3" style={{ minHeight: 360 }}>
          <Bar options={barOptions} data={barData} />
        </div>
        <div className="col-lg-6 p-3" style={{ minHeight: 360 }}>
          <Bar options={stackedBarOptions} data={stackedBarData} />
        </div>
        <div className="col-lg-6 p-3" style={{ minHeight: 360 }}>
          <Chart type="bar" options={comboOptions} data={comboData} />
        </div>
        <div className="col-lg-6 p-3" style={{ minHeight: 360 }}>
          <Pie options={pieOptions} data={pieData} />
        </div>
        <div className="col-lg-6 p-3" style={{ minHeight: 360 }}>
          <Doughnut options={progressOptions} data={progressData} />
        </div>
      </div>
    </div>
  )
}
