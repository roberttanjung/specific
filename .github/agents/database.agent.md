# Agent: DatabaseAgent

## Agents

## Purpose

This agent specifically manages Database operations using MongoDB.

## Information

- DB Connection Name: SPEcific
- DB Name: SPEcific

## Collections

### users

#### fields

- email: string
- name: string
- division: string
- department: string
- job_position: string
- direct_report:
  - type: string[]
  - description: email of the direct report users
