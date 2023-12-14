const checkHasAccessByPathname = (ownerPermissions: string[], pathname: string) => {
    const clubId = /my-clubs\/(.*)/.exec(pathname)?.[1]?.split("/")?.[0];
    if (ownerPermissions.includes(clubId!)) {
        return true;
    }
    return false;
}

export default checkHasAccessByPathname;