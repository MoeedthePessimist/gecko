"use client";
import useCompanyManagement from "@/hooks/use-company";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import CompanyForm from "@/components/forms/company";
import { Form } from "@/components/ui/form";

const CompanyUpsertPage = () => {
  const { companyForm, mutateCompanyMutation, onSubmitCompanyForm } =
    useCompanyManagement();

  console.log(companyForm.formState.errors);

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...companyForm}>
            <CompanyForm control={companyForm.control} />

            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button
                disabled={mutateCompanyMutation.isPending}
                onClick={() => companyForm.handleSubmit(onSubmitCompanyForm)}
              >
                {mutateCompanyMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>Save Company</>
                )}
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyUpsertPage;
