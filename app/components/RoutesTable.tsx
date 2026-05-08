import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";
import { Route } from "../types/routes";
import { Button } from "@/components/ui/button";
export default function RoutesTable({ routes }: { routes: Route[] }) {
  return (
    <Table className="shadow-xl inset-shadow-xs">
      <TableCaption>La liste de toutes nos routes en bdd.</TableCaption>
      <TableHeader className="w-full">
        <TableRow>
          <TableHead className="w-1/6">Nom du trajet</TableHead>
          <TableHead className="w-1/6">Depart→ Arrive</TableHead>
          <TableHead className="w-1/6">Type</TableHead>
          <TableHead className="w-1/6">Operateur</TableHead>
          <TableHead className="w-1/6">Durée</TableHead>
          <TableHead className="w-1/6">Co2 économisés</TableHead>
          <TableHead className="text-right!"> Voir le trajet</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="w-full">
        {routes.map((route) => (
          <TableRow key={route.id}>
            <TableCell>{route.line_name}</TableCell>
            <TableCell>
              {route.depart} → {route.arrive}
            </TableCell>
            <TableCell>
              <Badge
                className={
                  route.heure_depart >= 22 || route.heure_depart < 6
                    ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200" // Style Nuit
                    : "bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200" // Style Jour
                }
              >
                {route.heure_depart >= 22 || route.heure_depart < 6 ? "🌙 Nuit" : "☀️ Jour"}
              </Badge>
            </TableCell>
            <TableCell>{route.operateur}</TableCell>
            <TableCell>{route.line_name}</TableCell>
            <TableCell className=" text-green-500">🍃{(route.distance * 0.255).toFixed(2)} kg</TableCell>
            <TableCell className="text-right!">
              <Button className="rounded-full">...</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>
            <Field orientation="horizontal" className="w-fit">
              <FieldLabel htmlFor="select-rows-per-page">Route par page</FieldLabel>
              <Select defaultValue="25">
                <SelectTrigger className="w-20" id="select-rows-per-page">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="start">
                  <SelectGroup>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </TableCell>
          <TableCell className="text-right">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
