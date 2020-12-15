import './Chart.css'

export default function ChartState(props) {
    // const [activeChart, setAChart] = ({
    //     active: null,
    //     chartTabs:[]
    // });

    function newChart() {
        alert('click!')
    }

    return (
        <div>
            <button onClick={newChart}>+</button>
        </div>
    )
}