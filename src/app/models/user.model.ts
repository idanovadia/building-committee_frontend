export class User {
    private username: string;
    private first_name: string;
    private last_name: string;
    private city: string;
    private street: string;
    private building_number: string;
    private apartment_number: string;
    private phone: string;
    private role: string;
    private group_number: string;
    private code: string;

	constructor($username: string, $first_name: string, $last_name: string, $city: string, $street: string, $building_number: string, $apartment_number: string, $phone: string, $role: string, $group_number: string, $code: string) {
		this.username = $username;
		this.first_name = $first_name;
		this.last_name = $last_name;
		this.city = $city;
		this.street = $street;
		this.building_number = $building_number;
		this.apartment_number = $apartment_number;
		this.phone = $phone;
		this.role = $role;
		this.group_number = $group_number;
		this.code = $code;
	}

	
    /**
     * Getter $username
     * @return {string}
     */
	public get $username(): string {
		return this.username;
	}

    /**
     * Getter $first_name
     * @return {string}
     */
	public get $first_name(): string {
		return this.first_name;
	}

    /**
     * Getter $last_name
     * @return {string}
     */
	public get $last_name(): string {
		return this.last_name;
	}

    /**
     * Getter $city
     * @return {string}
     */
	public get $city(): string {
		return this.city;
	}

    /**
     * Getter $street
     * @return {string}
     */
	public get $street(): string {
		return this.street;
	}

    /**
     * Getter $building_number
     * @return {string}
     */
	public get $building_number(): string {
		return this.building_number;
	}

    /**
     * Getter $apartment_number
     * @return {string}
     */
	public get $apartment_number(): string {
		return this.apartment_number;
	}

    /**
     * Getter $phone
     * @return {string}
     */
	public get $phone(): string {
		return this.phone;
	}

    /**
     * Getter $role
     * @return {string}
     */
	public get $role(): string {
		return this.role;
	}

    /**
     * Getter $group_number
     * @return {string}
     */
	public get $group_number(): string {
		return this.group_number;
	}

    /**
     * Getter $code
     * @return {string}
     */
	public get $code(): string {
		return this.code;
	}

    /**
     * Setter $username
     * @param {string} value
     */
	public set $username(value: string) {
		this.username = value;
	}

    /**
     * Setter $first_name
     * @param {string} value
     */
	public set $first_name(value: string) {
		this.first_name = value;
	}

    /**
     * Setter $last_name
     * @param {string} value
     */
	public set $last_name(value: string) {
		this.last_name = value;
	}

    /**
     * Setter $city
     * @param {string} value
     */
	public set $city(value: string) {
		this.city = value;
	}

    /**
     * Setter $street
     * @param {string} value
     */
	public set $street(value: string) {
		this.street = value;
	}

    /**
     * Setter $building_number
     * @param {string} value
     */
	public set $building_number(value: string) {
		this.building_number = value;
	}

    /**
     * Setter $apartment_number
     * @param {string} value
     */
	public set $apartment_number(value: string) {
		this.apartment_number = value;
	}

    /**
     * Setter $phone
     * @param {string} value
     */
	public set $phone(value: string) {
		this.phone = value;
	}

    /**
     * Setter $role
     * @param {string} value
     */
	public set $role(value: string) {
		this.role = value;
	}

    /**
     * Setter $group_number
     * @param {string} value
     */
	public set $group_number(value: string) {
		this.group_number = value;
	}

    /**
     * Setter $code
     * @param {string} value
     */
	public set $code(value: string) {
		this.code = value;
	}

}
