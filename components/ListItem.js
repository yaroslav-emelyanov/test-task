import Link from 'next/link'

const ListItem = ({info}) => {
    return (
        <Link href="/number/[id]" as={`/number/${info.id}`}>
            <li className="list-group-item list-group-item-action position-relative
                           d-flex justify-content-between align-items-center"
                style={{cursor: 'pointer'}}
            >
                <div className="name">{info.name}</div>
                <div className="phone">{info.phone}</div>
            </li>
        </Link>
    )
};

export default ListItem;