import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { Badge } from "@repo/ui/badge";
import {
  CalendarIcon,
  MapPinIcon,
  BuildingIcon,
  CurrencyIcon,
  BriefcaseIcon,
  GlobeIcon,
  MailIcon,
  CheckCircleIcon,
} from "lucide-react";

const jobData = {
  id: "clj1234abcd",
  userId: "user123",
  title: "Senior Full Stack Developer",
  description:
    "We are seeking an experienced Full Stack Developer to join our innovative team. You will be responsible for developing and maintaining web applications, collaborating with cross-functional teams, and contributing to the entire software development lifecycle.",
  companyName: "TechNova Solutions",
  companyBio:
    "TechNova Solutions is a leading software development company specializing in cutting-edge web and mobile applications. We pride ourselves on our innovative approach and commitment to delivering high-quality solutions to our clients.",
  companyEmail: "careers@technovasolutions.com",
  category: "Software Development",
  type: "Full-time",
  workMode: "HYBRID",
  currency: "INR",
  city: "Bangalore",
  address: "123 Tech Park, Electronic City",
  application:
    "To apply, please send your resume and a cover letter to careers@technovasolutions.com with the subject line 'Senior Full Stack Developer Application'.",
  companyLogo: "https://i.imgur.com/YJOX1PC.png",
  hasSalaryRange: true,
  minSalary: 1800000,
  maxSalary: 2500000,
  isVerifiedJob: true,
  postedAt: new Date("2023-07-01"),
  updatedAt: new Date("2023-07-05"),
};

export default function Comp() {
  const formatSalary = (min: number, max: number) => {
    return `${jobData.currency} ${(min / 100000).toFixed(2)} - ${(
      max / 100000
    ).toFixed(2)} LPA`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <img
                src={jobData.companyLogo}
                alt={`${jobData.companyName} logo`}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <CardTitle className="text-2xl font-bold">
                  {jobData.title}
                </CardTitle>
                <p className="text-muted-foreground mt-1">
                  {jobData.companyName}
                </p>
              </div>
            </div>
            {jobData.isVerifiedJob && (
              <Badge variant="secondary" className="flex items-center">
                <CheckCircleIcon className="mr-1 h-4 w-4" />
                Verified
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <MapPinIcon className="mr-2 h-4 w-4" />
              {jobData.city}, {jobData.address}
            </div>
            <div className="flex items-center">
              <CurrencyIcon className="mr-2 h-4 w-4" />
              {formatSalary(jobData.minSalary, jobData.maxSalary)}
            </div>
            <div className="flex items-center">
              <BriefcaseIcon className="mr-2 h-4 w-4" />
              {jobData.type}
            </div>
            <div className="flex items-center">
              <GlobeIcon className="mr-2 h-4 w-4" />
              {jobData.workMode}
            </div>
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Posted on {formatDate(jobData.postedAt)}
            </div>
            <div className="flex items-center">
              <BuildingIcon className="mr-2 h-4 w-4" />
              {jobData.category}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Job Description</h3>
            <p className="text-muted-foreground">{jobData.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">About the Company</h3>
            <p className="text-muted-foreground">{jobData.companyBio}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">How to Apply</h3>
            <p className="text-muted-foreground">{jobData.application}</p>
          </div>
          <div className="flex items-center">
            <MailIcon className="mr-2 h-4 w-4" />
            <a
              href={`mailto:${jobData.companyEmail}`}
              className="text-blue-600 hover:underline"
            >
              {jobData.companyEmail}
            </a>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Last updated: {formatDate(jobData.updatedAt)}
          </p>
          <Button size="lg" className="w-full sm:w-auto">
            Apply Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
