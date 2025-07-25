import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import StudentForm from './student-form';
import ClassForm from './class-form';

const SubmissionForm = () => {
  return (
    <Tabs defaultValue="student" className="w-full">
      <TabsList className="w-full mb-4">
        <TabsTrigger value="student">By Student</TabsTrigger>
        <TabsTrigger value="class">By Class</TabsTrigger>
      </TabsList>
      <TabsContent value="student">
        <StudentForm />
      </TabsContent>
      <TabsContent value="class">
        <ClassForm />
      </TabsContent>
    </Tabs>
  );
};

export default SubmissionForm; 
