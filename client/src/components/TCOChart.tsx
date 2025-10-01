import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TCOChartProps {
  data: Array<{
    year: number;
    acquisition?: number;
    energy?: number;
    maintenance?: number;
    retrofits?: number;
    total: number;
  }>;
  type?: "line" | "area" | "bar";
  title?: string;
}

export default function TCOChart({ data, type = "area", title = "TCO Analysis Over Time" }: TCOChartProps) {
  return (
    <Card className="shadow-md" data-testid="card-tco-chart">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          {type === "line" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="year" className="text-xs" />
              <YAxis className="text-xs" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{ borderRadius: '6px', border: '1px solid hsl(var(--border))' }}
              />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Total TCO" />
            </LineChart>
          ) : type === "area" ? (
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="year" className="text-xs" />
              <YAxis className="text-xs" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{ borderRadius: '6px', border: '1px solid hsl(var(--border))' }}
              />
              <Legend />
              <Area type="monotone" dataKey="acquisition" stackId="1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" name="Acquisition" />
              <Area type="monotone" dataKey="energy" stackId="1" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" name="Energy" />
              <Area type="monotone" dataKey="maintenance" stackId="1" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" name="Maintenance" />
              <Area type="monotone" dataKey="retrofits" stackId="1" stroke="hsl(var(--chart-4))" fill="hsl(var(--chart-4))" name="Retrofits" />
            </AreaChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="year" className="text-xs" />
              <YAxis className="text-xs" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{ borderRadius: '6px', border: '1px solid hsl(var(--border))' }}
              />
              <Legend />
              <Bar dataKey="acquisition" stackId="a" fill="hsl(var(--chart-1))" name="Acquisition" />
              <Bar dataKey="energy" stackId="a" fill="hsl(var(--chart-2))" name="Energy" />
              <Bar dataKey="maintenance" stackId="a" fill="hsl(var(--chart-3))" name="Maintenance" />
              <Bar dataKey="retrofits" stackId="a" fill="hsl(var(--chart-4))" name="Retrofits" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
