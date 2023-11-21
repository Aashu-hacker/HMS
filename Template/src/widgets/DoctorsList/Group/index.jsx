// components
import GroupSeparator from '@ui/GroupSeparator';
import PersonList from '@components/PersonList';
import DoctorData from '@components/DoctorData';


// helpers
import {depsOptions} from '@constants/options';

export default function Group({arr, variant, ...props}) {
   
    const deps = [...new Set(arr.map(item => item.department[0].id))];
    const arrByDep = (dep) => arr.filter(item => item.department[0].id === dep);

    return (
        <>
            {
                deps.map(dep => {
                    const label = depsOptions.find(item => item.value === dep).label;
                    return (
                        <div key={dep}>
                            <GroupSeparator text={label}/>
                            <PersonList arr={arrByDep(dep)} type={variant} gender={props.gender} deps={props.deps} />
                        </div>
                    )
                })
            }
        </>
    )
}