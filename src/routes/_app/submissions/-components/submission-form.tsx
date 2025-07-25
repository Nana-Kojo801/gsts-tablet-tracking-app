import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import StudentForm from './student-form';
import ClassForm from './class-form';

const SubmissionForm = ({ closeDialog }: { closeDialog: () => void }) => {
  return (
    <Tabs defaultValue="student" className="w-full">
      <TabsList className="w-full mb-4">
        <TabsTrigger value="student">By Student</TabsTrigger>
        <TabsTrigger value="class">By Class</TabsTrigger>
      </TabsList>
      <TabsContent value="student">
        <StudentForm closeDialog={closeDialog} />
      </TabsContent>
      <TabsContent value="class">
        <ClassForm closeDialog={closeDialog} />
      </TabsContent>
    </Tabs>
  );
};

export default SubmissionForm; 
