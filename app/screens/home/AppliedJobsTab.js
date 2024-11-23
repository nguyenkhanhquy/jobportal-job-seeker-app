import React from "react";
import { ScrollView } from "react-native";
import AppliedJobCard from "../../components/card/AppliedJobCard";

const AppliedJobsTab = () => {
    const appliedJobs = [
        {
            title: "Frontend Developer",
            jobPosition: "Lập trình viên React",
            companyName: "Công ty A",
            applyDate: "2024-11-23",
            coverLetter: "Tôi là một người đam mê công nghệ, đặc biệt là phát triển giao diện...",
        },
        {
            title: "Backend Developer",
            jobPosition: "Lập trình viên Node.js",
            companyName: "Công ty B",
            applyDate: "2024-11-20",
            coverLetter: "Tôi muốn tham gia để đóng góp vào hệ thống backend của công ty...",
        },
    ];

    const handleViewDetail = (job) => {
        // navigation.navigate("JobDetail", { job });
    };

    const handleViewCV = (job) => {
        // console.log("Viewing CV for:", job.title);
    };

    return (
        <ScrollView className="flex-1 bg-gray-100 p-4">
            {appliedJobs.map((job, index) => (
                <AppliedJobCard
                    key={index}
                    job={job}
                    onViewDetail={() => handleViewDetail(job)}
                    onViewCV={() => handleViewCV(job)}
                />
            ))}
        </ScrollView>
    );
};

export default AppliedJobsTab;
