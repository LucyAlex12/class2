import {createContext, 
    useContext, 
    useState, 
    type ReactNode, 
    type Dispatch, 
    type SetStateAction} from "react";

    type Student = {
        name: string;
        email: string;
        course: string;
    };

    type StudentContextType = {
        student: Student;
        setStudent: Dispatch<SetStateAction<Student>>;
    };

    const StudentContext = createContext<StudentContextType | undefined>(undefined);

    export function StudentProvider ({children,}:{children: ReactNode}){
        const [student, setStudent] = useState<Student>({
            name: "",
            email: "chi@techcrush.com",
            course: "Mobile App Development",
        });
        return(
            <StudentContext.Provider value={{ student, setStudent }}>
                {children}
            </StudentContext.Provider>
        );
    }
    export function useStudent() {
        const context = useContext(StudentContext);
        if (!context) {
            throw new Error("useStudent must be used within a StudentProvider");
        }
        return context;
    }