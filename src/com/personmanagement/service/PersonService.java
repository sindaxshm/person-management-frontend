package com.personmanagement.service;

import com.personmanagement.entities.Person;
import com.personmanagement.repository.PersonRepository;

import java.util.List;

public class PersonService {

	private PersonRepository repo = new PersonRepository();

	public List<Person> getAll() {
		return repo.findAll();
	}

	public Person getById(int id) {
		return repo.findById(id);
	}

	public void create(Person p) {
		if (p.getName() == null || p.getName().trim().isEmpty())
			throw new RuntimeException("Name is required");

		repo.save(p);
	}

	public void update(Person p) {
		repo.update(p);
	}

	public void delete(int id) {
		repo.delete(id);
	}
}
