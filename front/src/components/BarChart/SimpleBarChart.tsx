import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import { useEffect, useState } from "react";
import "./SimpleBarChart.css";

interface IBar {
    name: string;
    color: string;
}

interface ISimpleBarChartProps {
    id: string;
    bars: IBar[];
    values: Record<string, unknown>[];
    dataKey: string;
}

export function SimpleBarChart(props: ISimpleBarChartProps) {
    const [values, setValues] = useState<Record<string, unknown>[]>([]);
    const [bars, setBars] = useState<IBar[]>([]);
    const [width, setWidth] = useState(0);

    useEffect(()=>{
        setBars(props.bars)
    }, [props.bars])

    useEffect(()=>{
        setValues(props.values)
    }, [props.values])

    useEffect(()=>{
        const width = document.getElementById(props.id)?.clientWidth as number;
        setWidth(width);

        window.addEventListener("resize", ()=>{
            const width = document.getElementById(props.id)?.clientWidth as number;
            setWidth(width);  
        })
    }, [])

    return (
        <div id={props.id} style={{width: "100%", height: "100%"}}>
            <BarChart
                width={width}
                height={300}
                data={values}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={props.dataKey} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                {
                    bars.map(bar=>{
                        return (
                            <Bar dataKey={bar.name} fill={bar.color} />
                        )
                    })
                }
            </BarChart>
        </div>
    )
}

const CustomTooltip = (props: Record<string, unknown>) => {
    if (props.active && props.payload && (props.payload as Record<string, unknown>[]).length) {
      return (
        <div className="bar-chart-custom-tooltip">
            <p>{`Dia: ${props.label}`}</p>
            <p>{`Faturamento : R$ ${((props.payload as Record<string, unknown>[])[0].value as number).toFixed(2)}`}</p>
        </div>
      );
    }
  
    return null;
};