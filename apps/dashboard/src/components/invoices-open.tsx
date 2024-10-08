import { getInvoiceSummary } from "@midday/supabase/cached-queries";
import { Card, CardContent, CardHeader, CardTitle } from "@midday/ui/card";
import { Icons } from "@midday/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@midday/ui/tooltip";
import { FormatAmount } from "./format-amount";

export async function InvoicesOpen({
  defaultCurrency,
}: {
  defaultCurrency: string;
}) {
  const { data } = await getInvoiceSummary();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="font-mono font-medium text-2xl">
          <FormatAmount
            amount={data?.total_amount ?? 0}
            currency={data?.currency ?? defaultCurrency}
          />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <span>Total open</span>
                  <Icons.Info className="h-4 w-4 text-sm text-[#606060]" />
                </div>
              </TooltipTrigger>
              <TooltipContent
                className="text-xs text-[#878787] p-1"
                side="bottom"
                sideOffset={10}
              >
                Open includes all invoices that are not paid or cancelled.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="text-sm text-muted-foreground">
            {data?.invoice_count} invoices
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
